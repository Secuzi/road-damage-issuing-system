import createError from 'http-errors'
import {fetchIssues, fetchIssueById} from '../services/issue.service.js'

export const getIssues = async (req, res, next) => {
    const issues = await fetchIssues()

    if (issues.length === 0) return next(createError(404, 'No issues found'))
    res.status(200).json(issues)
}

export const getIssue = async (req, res, next) => {
    const {id} = req.params

    const issue = await fetchIssueById(id)
    if (!issue) return next(createError(404, 'Issue not found'))

    res.status(200).json(issue)
}
