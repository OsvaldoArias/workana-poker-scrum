import { count } from 'node:console'
import { get, set } from '../store/asyncRedis'
import { UserService } from './users.services'
export class IssueService {
  static getIssue = async (uid: number, userId: number) => {
    try {
      const issues = await get('issues')
      const issuesObject = JSON.parse(`${issues}`)
      if (issuesObject.hasOwnProperty(uid)) {
        if (issuesObject[uid].status == 'Voting') {
          Object.keys(issuesObject[uid]['members']).map((key, index) => {
            const { value, ...memberWithoutValue } = issuesObject[uid][
              'members'
            ][key]
            if (parseInt(key) != userId) {
              issuesObject[uid]['members'][key] = {
                ...memberWithoutValue,
              }
            } else {
              issuesObject[uid]['members'][key] = {
                ...issuesObject[uid]['members'][key],
              }
            }
          })
        }
        if (issuesObject[uid].status == 'Reveal') {
          issuesObject[uid]['avg'] = 0
          Object.keys(issuesObject[uid]['members']).map((key, index) => {
            const { value } = issuesObject[uid]['members'][key]
            issuesObject[uid]['avg'] =
              issuesObject[uid]['avg'] +
              value / issuesObject[uid]['numberOfVotes']
          })
        }
        issuesObject[uid]['from'] = Object.keys(issuesObject).length
        return issuesObject[uid]
      } else {
        return 'faild to get issues'
      }
    } catch (error) {
      return 'faild to get issues'
    }
  }
  static initIssue = async () => {
    try {
      const members = await UserService.getUsersForIssue()
      const issuesObject = {
        1: {
          status: 'Voting',
          numberOfVotes: 0,
          members,
          createdBy: 'Porject Manager',
          issue: 1,
        },
      }
      try {
        await set('issues', JSON.stringify(issuesObject))
        return 'issue started successfully'
      } catch (error) {
        return 'Could not initialize issues'
      }
    } catch (error) {
      return error
    }
  }
  static setIssue = async (uid: number, userName: string) => {
    try {
      const issues = await get('issues')
      const members = await UserService.getUsersForIssue()
      const issuesObject = JSON.parse(`${issues}`)

      if (!issuesObject.hasOwnProperty(uid)) {
        issuesObject[uid] = {
          status: 'Voting',
          numberOfVotes: 0,
          members,
          createdBy: userName,
          issue: uid,
        }
        const issueString = JSON.stringify(issuesObject)
        try {
          await set('issues', issueString)
          issuesObject[uid]['from'] = Object.keys(issuesObject).length
          return issuesObject[uid]
        } catch (error) {
          return 'It was not possible to create new issue'
        }
      } else {
        return 'It was not possible to create new issue'
      }
    } catch (error) {
      return 'faild to get issues'
    }
  }
  static addVote = async (userUid: number, vote: number, issueUid: number) => {
    try {
      const issues = await get('issues')
      const issuesObject = JSON.parse(`${issues}`)
      if (issuesObject.hasOwnProperty(issueUid)) {
        if (issuesObject[issueUid]['members'][userUid]['status'] != 'voted') {
          ++issuesObject[issueUid]['numberOfVotes']
          issuesObject[issueUid]['members'][userUid]['value'] = vote
          issuesObject[issueUid]['members'][userUid]['status'] = 'voted'
        }
        if (
          issuesObject[issueUid]['numberOfVotes'] ===
          Object.keys(issuesObject[issueUid]['members']).length
        ) {
          issuesObject[issueUid]['status'] = 'Reveal'
        }
        const issueString = JSON.stringify(issuesObject)
        try {
          await set('issues', issueString)
        } catch (error) {
          return 'The vote was not registered correctly'
        }
      } else {
        return 'The vote was not registered correctly'
      }
    } catch (error) {
      return 'The vote was not registered correctly'
    }
  }
  static getTotalIssues = async () => {
    try {
      const issues = await get('issues')
      const userObject = JSON.parse(`${issues}`)
      const array = Object.keys(userObject).length
      return array
    } catch (error) {
      return 'There are not issues'
    }
  }
  static chekcStatusIssue = async (uid: number) => {
    try {
      const issues = await get('issues')
      const issuesObject = JSON.parse(`${issues}`)
      if (issuesObject.hasOwnProperty(uid)) {
        return issuesObject[uid].status
      }
    } catch (error) {
      return 'Issue not fount'
    }
  }
}
