import { Router } from 'express'
import { checkJwt } from '../../middlewares/checkJwt'
import UsersController from './users.controller'

const routes = Router()

routes.get('/', UsersController.index)
routes.get('/user', [checkJwt], UsersController.getUserJwt)
routes.post('/singin', UsersController.singIn)
routes.get('/singout', [checkJwt], UsersController.singOut)

export default routes
