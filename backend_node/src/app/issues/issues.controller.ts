import { Response, Request } from 'express'
import { IssueService } from '../../services/issues.sevices'
class IssuesController {
  static join = async (req: Request, res: Response) => {
    const { issue } = req.params
    const { userName } = res.locals.jwtPayload
    try {
      const resp = await IssueService.setIssue(parseInt(issue), userName)
      typeof resp === 'string'
        ? res.status(400).json(resp)
        : res.status(201).json(resp)
    } catch (error) {
      res.status(400).json('It was not possible to create new issue')
    }
  }
  static status = async (req: Request, res: Response) => {
    const { issue } = req.params
    const { userId } = res.locals.jwtPayload
    try {
      const resp = await IssueService.getIssue(parseInt(issue), userId)
      typeof resp === 'string' ? res.status(404).json(resp) : res.json(resp)
    } catch (error) {
      res.status(404).json('It was not possible get issue')
    }
  }
  static vote = async (req: Request, res: Response) => {
    const { vote } = req.body
    const { userId } = res.locals.jwtPayload
    const { issue } = req.params
    if (parseInt(issue) > 0) {
      try {
        const resp = await IssueService.addVote(userId, vote, parseInt(issue))
        if (typeof resp === 'string') {
          res.status(400).json(resp)
        } else {
          try {
            const resp = await IssueService.getIssue(parseInt(issue), userId)
            typeof resp === 'string'
              ? res.status(404).json(resp)
              : res.json(resp)
          } catch (error) {
            res.status(404).json('It was not possible get issue')
          }
        }
      } catch (error) {
        res.status(400).json('It was not possible to create new vote')
      }
    } else {
      res.status(400).json('It was not possible to create new vote')
    }
  }
}

export default IssuesController
