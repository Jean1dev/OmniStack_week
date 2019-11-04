import { Op } from 'sequelize'
import User from "../models/User";
import Appointment from "../models/Appointment";
import { startOfDay, parseISO, endOfDay } from 'date-fns';

class ScheduleController {

    async list(req, res) {
        const checkUserProvider = await User.findOne({
            where: { id: req.userId, provider: true }
        })

        if (!checkUserProvider) {
            return res.status(401).json({ error: 'User is not a provider' })
        }

        const { date } = req.query
        const parsedDate = parseISO(date)
        const appointments = await Appointment.findAll(
            {
                where: {
                    provider_id: req.userId,
                    canceled_at: null,
                    date: {
                        [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)]
                    }
                }
            })
        return res.json(appointments)
    }
}

export default new ScheduleController()