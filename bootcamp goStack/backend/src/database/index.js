import Sequelize from 'sequelize'
import config from '../config/database'
import User from '../app/models/User'
import File from '../app/models/File'
import Appoint from '../app/models/Appointment'
import mongoose from 'mongoose'

const models = [User, File, Appoint]

class Database {

    constructor() {
        this.init()
        this.mongo()
    }

    init() {
        this.connection = new Sequelize(config)
        models
            .map(entidade => entidade.init(this.connection) )
            .map(entidade => entidade.associate && entidade.associate(this.connection.models) )

    }

    mongo() {
        this.mongoConnection = mongoose.connect(
            process.env.MONGO_URL,
            {
                useNewUrlParser: true,
                useFindAndModify: true
            }
        )
    }
}

export default new Database()