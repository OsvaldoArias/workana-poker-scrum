import { get, set } from '../store/asyncRedis'
export class UserService {
  static getUsers = async () => {
    try {
      const users = await get('users')
      const userObject = JSON.parse(`${users}`)
      Object.keys(userObject).map((key, index) => {
        userObject[key] = {
          ...userObject[key],
          userId: key,
        }
      })
      return userObject
    } catch (error) {
      return 'Users not found'
    }
  }
  static getUsersForIssue = async () => {
    try {
      const users = await get('users')
      const userObject = JSON.parse(`${users}`)
      Object.keys(userObject).map((key, index) => {
        userObject[key] = {
          ...userObject[key],
          userId: key,
          status: 'waiting',
          value: '',
        }
      })
      return userObject
    } catch (error) {
      return 'Users not found'
    }
  }
  static initUsers = async () => {
    const users = {
      1: {
        userName: 'Osvaldo',
        status: false,
      },
      2: {
        userName: 'Juan',
        status: false,
      },
      3: {
        userName: 'Manuela',
        status: false,
      },
    }
    try {
      await set('users', JSON.stringify(users))
      return 'Users started successfully'
    } catch (error) {
      return 'Could not initialize users'
    }
  }
  static setUser = async (userId: number, status: boolean) => {
    try {
      const users = await get('users')
      const usersObject = JSON.parse(`${users}`)
      if (usersObject.hasOwnProperty(userId)) {
        usersObject[userId].status = status
      }
      const userString = JSON.stringify(usersObject)
      try {
        await set('users', userString)
      } catch (error) {
        return 'could not change user status'
      }
    } catch (error) {
      return 'Users not found'
    }
  }
  static getUser = async (userId: number) => {
    try {
      const users = await get('users')
      const usersObject = JSON.parse(`${users}`)
      return usersObject.hasOwnProperty(userId)
        ? usersObject[userId]
        : undefined
    } catch (error) {
      return 'User not found'
    }
  }
  static getUserOnline = async () => {
    try {
      const users = await get('users')
      const userObject = JSON.parse(`${users}`)
      const array = Object.keys(userObject).filter(
        (key) => userObject[key].status,
      ).length
      return array
    } catch (error) {
      return 'There are not users'
    }
  }
}
