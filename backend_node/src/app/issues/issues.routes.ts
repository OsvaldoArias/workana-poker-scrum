import { Router } from 'express'
import IssuesController from './issues.controller'

const routes = Router()

routes.get('/:issue', IssuesController.status)
routes.post('/:issue/join', IssuesController.join)
routes.post('/:issue/vote', IssuesController.vote)

export default routes
