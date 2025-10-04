const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET

const generateToken = (user) => {

    const payload = {
        id: user.id,
        email: user.email,
        display_name: user.display_name,
        provider: user.provider,
        created_at: user.created_at,
        updated_at: user.updated_at
    };

    return jwt.sign(payload, SECRET_KEY, {expiresIn: '7d'});
}

function verifyToken(token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken
};