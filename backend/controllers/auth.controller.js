import * as pool from '../db/db.js';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        if(password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        const checkUser = await pool.query("select * from smitter_users where username = $1", [username]);

        if(checkUser.rows.length) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query("insert into smitter_users (email, hashed_password, username) values($1, $2, $3) RETURNING *", 
        [email, hashedPassword, username]);

        if(newUser) {
            generateTokenAndSetCookie(newUser.rows[0].id, res);

            res.status(201).json({
                "id": newUser.rows[0].id,
                "username": username,
                "email": email
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }


    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await pool.query("select * from smitter_users where username = $1", [username]);
        const isUser = await user.rows[0].hashed_password;
        const isPasswordCorrect = await bcrypt.compare(password, isUser || "");

        // console.log("link:", user)

        if(isUser.length === 0 || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        };

        generateTokenAndSetCookie(user.rows[0].id, res);
        res.status(200).json({
            email: user.rows[0].email, 
            username: user.rows[0].username, 
            cover: user.rows[0].cover, 
            display_name: user.rows[0].display_name, 
            avatar: user.rows[0].avatar, 
            bio: user.rows[0].bio, 
            location: user.rows[0].location, 
            website: user.rows[0].website
        });
;


    } catch (error) {
        console.log('Error in Login Controller', error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in Logout Controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
    console.log("User logged out");
}

