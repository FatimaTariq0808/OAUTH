const getUserInfo = (req, res) => {
    if (!req.user) {
        return res.status(401).json({error: 'Unauthorized'});
    }
    const {id, provider, display_name, email, avatar_url, created_at, updated_at} = req.user;
    res.json({id, provider, display_name, email, avatar_url, created_at, updated_at});
}

const publicInfo = (req, res) => {
    res.json({message: 'This is a public endpoint'});
}

module.exports = {
    getUserInfo,
    publicInfo
};