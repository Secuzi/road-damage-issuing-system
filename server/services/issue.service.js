import Issue from '../models/issue.model.js'

export const fetchIssues = async () => await Issue.find()

export const fetchIssueById = async (id) => await Issue.findById(id)

export const insertIssue = async (issue) => await Issue.create(issue)

export const updateIssueById = async (id, issue) =>
    await Issue.findByIdAndUpdate(id, issue)

export const deleteIssueById = async (id) => await Issue.findByIdAndDelete(id)
