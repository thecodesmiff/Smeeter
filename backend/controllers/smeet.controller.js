import * as pool from '../db/db.js';

export const getSmeets = async (req, res) => {
    try {
        const smeets = await pool.query(
            `SELECT smeets.id, smeet, date, smeets.username, tweetimg, tweetgif, display_name, avatar, cover
            FROM smeets
            JOIN smitter_users ON smitter_users.username = smeets.username
            ORDER BY date DESC`
        );
        const smeetList = smeets.rows;
        res.status(200).json(smeetList);
    } catch (error) {
        console.log("Error in getSmeets", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getUserSmeets = async (req, res) => {
    try {
        const { username } = req.params;
        const smeets = await pool.query(
            `SELECT smeets.id, smeet, date, smeets.username, tweetimg, tweetgif, display_name, avatar, cover
            FROM smitter_users
            LEFT JOIN smeets ON smitter_users.username = smeets.username
            WHERE smeets.username = $1
            ORDER BY date DESC`,
            [username]
        );
        const smeetList = await smeets.rows;
        res.status(200).json(smeetList);
    } catch (error) {
        console.log('Error in getUserSmeets', error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getSingleSmeet = async (req, res) => {
    try {
        const { id } = req.params;
        const getSmeet = await pool.query(
            `SELECT smeets.id, smeet, date, smeets.username, tweetimg, tweetgif, display_name, avatar, cover
            FROM smeets JOIN smitter_users ON smitter_users.username = smeets.username
            WHERE smeets.id = $1`,
            [id]
            );
        const retrievedSmeet = await getSmeet.rows[0];
        res.status(200).json(retrievedSmeet);
    } catch (error) {
        console.log("Error in getSingleSmeet", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const editSmeet = async (req, res) => {
    try {
        const { smeet, tweetimg, tweetgif } = req.body;
        const { id } = req.params;

        const updates = await pool.query(
            `UPDATE smeets
            SET smeet = $1,
            tweetimg = $2,
            tweetgif = $3
            WHERE id = $4
            RETURNING *`,
            [smeet, tweetimg, tweetgif, id]
        )
        const updatedProfile = updates.rows[0];
        res.status(200).json(updatedProfile);
    } catch (error) {
        console.log("Error in editSmeet", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


export const postSmeet = async (req, res) => {
    try {
        const { smeet, date, username, image, gif } = req.body;
        const post = await pool.query(
            `INSERT INTO smeets (smeet, date, username, tweetimg, tweetgif)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [smeet, date, username, image, gif]
        );
        const postedSmeet = post.rows[0];
        res.status(200).json(postedSmeet);
    } catch (error) {
        console.log("Error in uploadSmeet", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const uploadSmeetImg = async (req, res) => {
    try {
        const { username } = req.params;
        const location = req.files[0].location;

        // const addSmeetImg = await pool.query(
        //     `UPDATE smeets
        //     SET tweetimg = $1
        //     WHERE username = $2
        //     RETURNING tweetimg`,
        //     [location, username]
        // );

        console.log('Uploaded!')
        res.status(200).send(req.files);
    } catch (error) {
        console.log("Error in UploadSmeetImg", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const deleteSmeet = async (req, res) => {
    try {
        const { id } = req.params;
        const removeSmeet = await pool.query(
            `DELETE FROM smeets
            WHERE id = $1 
            RETURNING id`,
            [id]
        );
        const deletedSmeet = removeSmeet.rows[0].id;
        res.status(200).json(`Tweet with id: ${deletedSmeet} removed!`);
    } catch (error) {
        console.log("Error in deleteSmeet", error.message);
        res.status(500).json({ error: "Internal Server Error"});
    }
}

