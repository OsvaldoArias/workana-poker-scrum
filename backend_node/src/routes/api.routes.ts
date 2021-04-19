import { Router } from 'express'
const router = Router()
import usersRoutes from '../app/users/users.routes'
import issueRoutes from '../app/issues/issues.routes'
import { checkJwt } from '../middlewares/checkJwt'

router.use('/issues', [checkJwt], issueRoutes)
router.use('/users', usersRoutes)

export default router
