import User from './app/controller/UserController'
import Provider from './app/controller/ProvidersController'
import Session from './app/controller/SessionController'
import FileCtrl from './app/controller/FileController'
import Appointment from './app/controller/AppointmentController'
import authMiddleware from './app/middlewares/auth'
import multer from 'multer'
import multerConfig from './config/multer'
import ScheduleController from './app/controller/ScheduleController'

const { Router } = require('express')

const routes = new Router()
const upload = multer(multerConfig)

routes.get('/', (req, res) => {
    res.send('ok')
})

routes.post('/users', User.store)
routes.post('/sessions', Session.store)

routes.use(authMiddleware)
routes.put('/users', User.update)
routes.get('/providers', Provider.list)

routes.post('/files', upload.single('file'), FileCtrl.store)

routes.post('/appointments', Appointment.store)
routes.get('/appointments', Appointment.list)

routes.get('/schedule', ScheduleController.list)

module.exports = routes