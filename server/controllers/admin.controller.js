import createError from 'http-errors'
import {
    deleteIssueById,
    fetchIssueById,
    fetchIssues,
} from '../services/issue.service.js'
import {fetchUsers, fetchUserById} from '../services/user.service.js'

export const getIssues = async (req, res, next) => {
    const issues = await fetchIssues()

    res.status(200).json(issues)
}

export const getIssue = async (req, res, next) => {
    const {id} = req.params

    const issue = await fetchIssueById(id)
    if (!issue) return next(createError(404, 'Issue not found'))

    res.status(200).json(issue)
}

export const updateIssue = async (req, res, next) => {
    const {id} = req.params

    res.send(`Update Issue ${id}`)
}

export const deleteIssue = async (req, res, next) => {
    const {id} = req.params

    const result = await deleteIssueById(id)
    if (!result) return next(createError(404, 'Issue not found'))

    res.status(200).json({message: 'Issue deleted'})
}

export const getUsers = async (req, res, next) => {
    const users = await fetchUsers()

    res.status(200).json(users)
}

export const getUser = async (req, res, next) => {
    const {id} = req.params

    const user = await fetchUserById(id)
    if (!user) return next(createError(404, 'User not found'))

    res.status(200).json(user)
}

export const suspendUser = async (req, res, next) => {
    const {id} = req.params
    res.send(`Suspend User ${id}`)
}
