import User from '../models/User'
import * as Yup from 'yup'
import File from '../models/File'

class UserController {

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6)
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({error: 'Validations fails'})
        }
        
        const exists = await User.findOne({ where: { email: req.body.email }})

        if (exists) {
            return res.status(400).json( { error: 'user ja existe'})
        }

        const user = await User.create(req.body)
        return res.json(user)
    }

    async update(req, res) {
        const { oldPassword } = req.body
        const user = await User.findByPk(req.userId)
        
        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ error: 'Password does not match' })
        }

        await user.update(req.body)

        //analisar aqui
        const { id, name, avatar } = await User.findByPk(req.userId, {
            include: [{
                model : File,
                as: 'avatar',
                attributes: ['id', 'path', 'url']
            }]
        })
        return res.json({ id, name, avatar })
    }
}

export default new UserController()