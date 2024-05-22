import { profile } from 'console';
import * as pool from '../db/db.js';

export const editProfile = async (req, res) => {
    try {
        const { display_name, bio, location, website } = req.body;
        const { username } = req.params;

        const updateInfo = await pool.query(
            `update smitter_users
            set display_name = $1,
            bio = $2,
            location = $3,
            website = $4
            where username = $5 RETURNING *`,
            [display_name, bio, location, website, username]
        );
        const profileInfo = await updateInfo.rows[0];
        res.status(200).json({
            id: profileInfo.id,
            display_name: profileInfo.display_name,
            bio: profileInfo.bio,
            location: profileInfo.location,
            website: profile.website,
            username: profileInfo.username
        })
    } catch (error) {
        console.log('Error in editProfile', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const smeetCount = async (req, res) => {
    try {
        const { username } = req.params;
        const count = await pool.query(
            `SELECT COUNT(*)
            FROM smeets
            WHERE username = $1`,
            [username]
        );
        const userSmeetCount = count.rows[0];
        res.status(200).json(userSmeetCount);
    } catch (error) {
        console.log("Error in smeetCount", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const addAvatar = async (req, res) => {
    try {
        const { username } = req.params;
        console.log('Uploaded');
        // res.send(req.files);
        const location = req.files[0].location;
        const addImg = await pool.query(
            `UPDATE smitter_users 
            SET avatar = $1
            WHERE username = $2 
            RETURNING avatar`,
            [location, username]
        );
        const newImg = addImg.rows
        res.status(200).json(location)

    } catch (error) {
        console.log("Error in addAvatar", error.message);
        res.status(500).json({ error: "Internal Server Error"});
    }
}

export const uploadCoverImage = async (req, res) => {
    try {
        const { username } = req.params;
        const location = req.files[0].location;

        const addCover = await pool.query(
            `UPDATE smitter_users 
            SET cover = $1
            WHERE username = $2
            RETURNING cover`,
            [location, username]
        );

        console.log('Uploaded!')
        res.status(200).send(req.files);
    } catch (error) {
        console.log("Error in UploadCoverImage", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// export const uploadAvatarImage = async (req, res) => {
//     try {
//         const { username } = req.params;
//         const location = req.files[0].location;

//         const addAvatar = await pool.query(
//             `UPDATE smitter_users 
//             SET avatar = $1
//             WHERE username = $2
//             RETURNING cover`,
//             [location, username]
//         );


//     } catch (error) {
//         console.log("Error in uploadAvatarImage", error.message);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }

