import Issue from '../models/issue.model.js'

export const getIssues = async (req, res) => {
    const issues = await Issue.find()

    console.log(issues[0]._id)
    res.status(200).json(issues)
}

export const getIssue = async (req, res) => {
    const {id} = req.params

    const issue = await Issue.findById(id)

    res.status(200).json(issue)
}
