import { Response, Request } from 'express'
import { UserService } from '../../services/users.services'
import jwt from 'jsonwebtoken'
import config from '../../config/config'
class UsersController {
  static index = async (req: Request, res: Response) => {
    try {
      const users = await UserService.getUsers()
      res.json(users)
    } catch (error) {
      res.status(404).json('It was not possible get users')
    }
  }
  static getUserJwt = (req: Request, res: Response) => {
    const { userId, userName } = res.locals.jwtPayload
    res.json({ userId, userName })
  }
  static singIn = async (req: Request, res: Response) => {
    const { userId, userName } = req.body
    if (userId && userName) {
      try {
        const { status } = await UserService.getUser(userId)
        if (!status) {
          try {
            await UserService.setUser(userId, true)
            const token = jwt.sign({ userId, userName }, config.jwt, {
              expiresIn: '1h',
            })
            res.json({ token })
          } catch (error) {
            res.status(400).json('Could not sing in')
          }
        } else {
          res.status(400).json('user has already logged in')
        }
      } catch (error) {
        res.status(400).json('Could not sing in')
      }
    } else {
      res.status(400).json('Could not sing in')
    }
  }
  static singOut = async (req: Request, res: Response) => {
    const { userId } = res.locals.jwtPayload
    try {
      await UserService.setUser(userId, false)
      res.json('Sing out')
    } catch (error) {
      res.status(400).json('Could not sing out')
    }
  }
}

export default UsersController
