export const getIssues = async (req, res) => {
    res.send('Issues')
}

export const getIssue = async (req, res) => {
    res.send('Issue')
}

export const updateIssue = async (req, res) => {
    const {id} = req.params
    res.send(`Update Issue ${id}`)
}

export const deleteIssue = async (req, res) => {
    const {id} = req.params
    res.send(`Delete Issue ${id}`)
}
