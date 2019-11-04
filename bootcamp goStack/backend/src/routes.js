import User from './app/controller/UserController'
import Provider from './app/controller/ProvidersController'
import Session from './app/controller/SessionController'
import FileCtrl from './app/controller/FileController'
import Appointment from './app/controller/AppointmentController'
import authMiddleware from './app/middlewares/auth'
import multer from 'multer'
import multerConfig from './config/multer'
import ScheduleController from './app/controller/ScheduleController'
import NotificationController from './app/controller/NotificationController'
import AvailableController from './app/controller/AvailableController'

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
routes.get('/providers/:providerId/available', AvailableController.list)

routes.post('/files', upload.single('file'), FileCtrl.store)

routes.post('/appointments', Appointment.store)
routes.get('/appointments', Appointment.list)
routes.delete('/appointments/:id', Appointment.delete)

routes.get('/schedule', ScheduleController.list)

routes.get('/notifications', NotificationController.list)
routes.put('/notifications/:id', NotificationController.update)

module.exports = routes