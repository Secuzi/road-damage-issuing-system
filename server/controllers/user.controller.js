import createError from 'http-errors'
import {
    fetchIssues,
    fetchIssueById,
    insertIssue,
    updateIssueById,
    deleteIssueById,
} from '../services/issue.service.js'

export const getIssues = async (req, res, next) => {
    const issues = await fetchIssues()

    if (issues.length === 0) return next(createError(404, 'Issues empty'))
    res.status(200).json(issues)
}

export const getIssue = async (req, res, next) => {
    const {id} = req.params

    const issue = await fetchIssueById(id)
    if (!issue) return next(createError(404, 'Issue not found'))

    res.status(200).json(issue)
}

export const createIssue = async (req, res, next) => {
    res.send('createIssue')
}

export const updateIssue = async (req, res, next) => {
    const {id} = req.params

    const result = updateIssueById(id, req.body)
    if (!result) return next(createError(404, 'Issue not found'))
    res.send(`updateIssue ${id}`)
}

export const deleteIssue = async (req, res, next) => {
    const {id} = req.params

    const result = deleteIssueById(id)
    if (!result) return next(createError(404, 'Issue not found'))
    res.send(`deleteIssue ${id}`)
}
