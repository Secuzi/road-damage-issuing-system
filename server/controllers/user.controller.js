export const getIssues = async (req, res) => {
    res.send('getIssues')
}

export const getIssue = async (req, res) => {
    const {id} = req.params
    res.send(`getIssue ${id}`)
}

export const createIssue = async (req, res) => {
    res.send('createIssue')
}

export const updateIssue = async (req, res) => {
    const {id} = req.params
    res.send(`updateIssue ${id}`)
}

export const deleteIssue = async (req, res) => {
    const {id} = req.params
    res.send(`deleteIssue ${id}`)
}
