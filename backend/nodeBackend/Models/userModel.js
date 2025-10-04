const pool = require('../config/db');

const createUser = async ({provider, provider_id, display_name, email, avatar_url}) => {
    res = await pool.query(
        `INSERT INTO users (provider, provider_id, display_name, email, avatar_url, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
         RETURNING *`,
        [provider, provider_id, display_name, email, avatar_url]
    );
    return res.rows[0];
}

const getUserByProviderId = async (provider, provider_id) => {
    res = await pool.query(
        `SELECT * FROM users WHERE provider = $1 AND provider_id = $2`,
        [provider, provider_id]
    );
    return res.rows[0];
}

const getById = async (id) => {
    const res = await pool.query(
        `SELECT * FROM users WHERE id = $1`,
        [id]
    );
    return res.rows[0];
}

const upsertFromOAuth = async ({provider, provider_id, display_name, email, avatar_url}) => {
    const existingUser = await getUserByProviderId(provider, provider_id);
    if (existingUser) {
        const res = await pool.query(
            `UPDATE users 
             SET display_name = $1, email = $2, avatar_url = $3, updated_at = NOW()
             WHERE id = $4
             RETURNING *`,
            [display_name, email, avatar_url, existingUser.id]
        );
        return getById(existingUser.id);
    } else {
        return createUser({provider, provider_id, display_name, email, avatar_url});
    }
}

module.exports = {
    createUser,
    getUserByProviderId,
    upsertFromOAuth,
    getById
};