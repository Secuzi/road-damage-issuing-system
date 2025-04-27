import createError from 'http-errors'
import {
    fetchIssues,
    fetchIssueById,
    insertIssue,
    updateIssueById,
    deleteIssueById,
} from '../services/issue.service.js'

export const getIssues = async (req, res) => {
    const issues = await fetchIssues()
    res.status(200).send(issues)
}

export const getIssue = async (req, res) => {
    const {id} = req.params

    const issue = await fetchIssueById(id)
    if (!issue) return createError(404, 'Issue not found')

    res.status(200).send(issue)
}

export const createIssue = async (req, res) => {}

export const updateIssue = async (req, res) => {
    const {id} = req.params
    res.send(`updateIssue ${id}`)
}

export const deleteIssue = async (req, res) => {
    const {id} = req.params
    res.send(`deleteIssue ${id}`)
}
