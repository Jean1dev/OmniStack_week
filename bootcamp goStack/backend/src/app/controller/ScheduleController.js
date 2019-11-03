import User from "../models/User";
import Appointment from "../models/Appointment";

class ScheduleController {

    async list(req, res) {
        const checkUserProvider = await User.findOne({
            where: { id: req.userId, provider: true}
        })

        if (!checkUserProvider) {
            return res.status(401).json({error: 'User is not a provider'})
        }

        const {date} = req.query
        const appointments = await Appointment.findAll({where: {provider_id: req.userId} })
        return res.send('ok')
    }
}

export default new ScheduleController()