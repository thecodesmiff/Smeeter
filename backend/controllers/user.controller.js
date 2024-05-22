import * as pool from '../db/db.js';

export const getUsers = async (req, res) => {
    try {
        const allUsers = await pool.query('SELECT username FROM smitter_users');
        const data = await allUsers.rows;
        let usernames = [];

        data.forEach((user) => {
            usernames.push(user.username);
        })

        res.status(200).json(usernames);
    } catch (error) {
        console.log('Error in getUsers', error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getUserInfo = async (req, res) => {
    const { username } = req.params;
    try {
        const userInfo = await pool.query('SELECT email, username, cover, display_name, avatar, bio, location, website  FROM smitter_users WHERE username = $1', [username])
        const data = await userInfo.rows[0];
        res.status(200).json(data);
    } catch (error) {
        console.log("Error in getUserInfo", error.message);
        res.status(500).json({ error: "Internal Server Error"});
    }
}