import { io } from '..'
import { IssueService } from '../services/issues.sevices'
import { UserService } from '../services/users.services'

io.on('connection', (client: any) => {
  client.on('issue', async (payloadClient: any) => {
    const totalIssues = await IssueService.getTotalIssues()
    const payload = {
      ...payloadClient,
      totalIssues,
    }
    io.emit('issue', { payload })
  })
  client.on('users', async () => {
    const usersOnline = await UserService.getUserOnline()
    io.emit('users', usersOnline)
  })
  client.on('votedIssue', async (issue: number) => {
    const issueStatus = await IssueService.chekcStatusIssue(issue)
    if (issueStatus === 'Reveal') {
      const payload = {
        issueStatus,
        issue,
      }
      io.emit('votedIssue', { payload })
    }
  })
})
