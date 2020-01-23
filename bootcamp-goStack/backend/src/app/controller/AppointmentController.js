import Appointment from '../models/Appointment'
import * as Yup from 'yup'
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns'
import User from '../models/User'
import File from '../models/File'
import Notification from '../schemas/Notification'
import Queue from '../../lib/Queue'
import CancellationMail from '../jobs/CancellationMail'

class AppointmentController {

    async list(req, res) {
        const { page = 1 } = req.query

        const appointments = await Appointment.findAll({
            where: { user_id: req.userId, canceled_at: null },
            order: ['date'],
            limit: 20,
            offset: (page - 1) * 20,
            attributes: ['id', 'date', 'past', 'cancelable'],
            include: [
                {
                    model: User,
                    as: 'provider',
                    attributes: ['id', 'name'],
                    include: [
                        {
                            model: File,
                            as: 'avatar',
                            attributes: ['id', 'path', 'url']
                        }
                    ]
                }
            ]
        })

        return res.json(appointments)
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            provider_id: Yup.number().required(),
            date: Yup.date().required()
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validations fails' })
        }

        const { provider_id, date } = req.body
        const checkIsProvider = await User.findOne({
            where: { id: provider_id, provider: true }
        })

        if (!checkIsProvider) {
            return res.status(401).json({ error: 'You can only create appointments with providers' })
        }

        const hourStart = startOfHour(parseISO(date))

        if (isBefore(hourStart, new Date())) {
            return res.status(400).json({ error: 'Past date are not permitted' })
        }

        const checkAvalibility = await Appointment.findOne({
            where: {
                provider_id,
                canceled_at: null,
                date: hourStart
            }
        })

        if (checkAvalibility) {
            return res.status(400).json({ error: 'Appointment date is not available' })
        }

        this.notificate(provider_id, hourStart)

        return res.json(await Appointment.create({
            user_id: req.userId,
            provider_id,
            date
        }))
    }

    async delete(req, res) {
        const appointment = await Appointment.findByPk(req.params.id, {
            include: [
                { model: User, as: 'provider', attributes: ['name', 'email'] }
            ]
        })

        if (appointment.user_id != req.userId) {
            return res.status(401).json({
                error: 'You dont have permission to cancel this appointment.'
            })
        }

        const dateWithSubHour = subHours(appointment.date, 2)

        if (isBefore(dateWithSubHour, new Date())) {
            return res.status(401).json({
                error: 'You can only cancel appointments 2 hours in advance.'
            })
        }

        appointment.canceled_at = new Date()
        await appointment.save()

        this.addMailToQueue(appointment)
        return res.json(appointment)
    }

    addMailToQueue(data) {
        Queue.add(CancellationMail.key, { data })
    }

    notificate(userId, date) {
        User.findByPk(userId).then(user => {
            const formattedDate = format(
                date,
                "'dia' dd 'de' mm"
            )

            Notification.create({
                content: `Novo agendamento de ${user.name} no ${formattedDate}`,
                user: userId
            })
        })
    }
}

export default new AppointmentController()