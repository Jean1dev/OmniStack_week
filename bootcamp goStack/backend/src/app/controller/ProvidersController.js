import User from '../models/User'
import File from '../models/File'

class ProviderController {

    async list(req, res) {
        return res.json(await User.findAll({
            where: { provider: true},
            attributes: ['id', 'name', 'email', 'avatar_id'],
            include: [
                { model: File, as: 'avatar', attributes: ['name', 'path', 'url'] }
            ]
        }))
    }
}

export default new ProviderController()