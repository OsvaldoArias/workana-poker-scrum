import redis from 'redis'
import { promisify } from 'util'
import { IssueService } from '../services/issues.sevices'
import { UserService } from '../services/users.services'
export const client = redis.createClient({ host: 'redis' })
client.on('connect', async () => {
  console.log('Redis client connected')
  await UserService.initUsers()
  await IssueService.initIssue()
})

client.on('error', (error) => {
  console.error(error)
})

export const get = promisify(client.get).bind(client)
export const set = promisify(client.set).bind(client)
