import User from '../models/User'

class UserController {

    async store(req, res) {
        const exists = await User.findOne({ where: { email: req.body.email }})

        if (exists) {
            return res.status(400).json( { error: 'user ja existe'})
        }

        const user = await User.create(req.body)
        return res.json(user)
    }

    async update(req, res) {
        return res.send('ok')
    }
}

export default new UserController()