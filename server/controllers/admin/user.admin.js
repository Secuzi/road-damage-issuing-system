export const getUsers = async (req, res) => {
    res.send('Users')
}

export const getUser = async (req, res) => {
    const {id} = req.params
    res.send(`User ${id}`)
}

export const suspendUser = async (req, res) => {
    const {id} = req.params
    res.send(`Suspend User ${id}`)
}
