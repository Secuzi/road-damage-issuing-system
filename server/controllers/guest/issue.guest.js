export const getIssues = (req, res) => {
    res.send('Issues')
}

export const getIssue = (req, res) => {
    const {id} = req.params
    res.send(`Issue ${id}`)
}
