const {user} = require('../Models');
const {generateToken} = require('../utils/jwt');

const CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const googleRedirect = async (req, res) => {
    const redirectUri = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(CALLBACK_URL)}&response_type=code&scope=openid%20email%20profile`;
    res.redirect(redirectUri);
};

const googleCallback = async (req, res) => {
    const code = req.query.code;

    if (!code) {
        return res.status(400).json({error: 'Authorization code not provided'});
    }

    try {
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: new URLSearchParams({
                code,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                redirect_uri: CALLBACK_URL,
                grant_type: 'authorization_code'
            }),
        });

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        if (!accessToken) {
            return res.status(400).json({error: 'Failed to obtain access token'});
        }

        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {Authorization: `Bearer ${accessToken}`},
        });

        const profile = await userInfoResponse.json();
        const {email, name: display_name, id: provider_id, picture: avatar_url} = profile;

        const insertUserData = await user.upsertFromOAuth({
            provider: 'google',
            provider_id,
            display_name,
            email,
            avatar_url
        });

        const token = generateToken(insertUserData);
        res.json({message: 'Login successful', token, user: insertUserData});
    }
    catch (error) {
        console.error('Error during Google OAuth callback:', error);
        res.status(500).json({error: 'Internal server error'});
    }

}

module.exports = {
    googleRedirect,
    googleCallback
}; 