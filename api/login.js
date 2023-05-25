const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const jwtExpiration = 15 * 24 * 60 * 60; // 15 days in seconds

const router = express.Router();

// Authorization endpoint
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if email already exists
        const userWithEmail = await User.findOne({
            where: { email },
        });

        if (!userWithEmail) {
            return res.status(400).json({ message: "Email or password does not match..." });
        }

        if (!userWithEmail.is_verified) {
            return res.status(400).json({ message: "Please verify your email before logging in" });
        }

        // Compare passwords using bcrypt
        const isPasswordMatch = await bcrypt.compare(password, userWithEmail.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Email or password does not match..." });
        }

        // Generate JWT token
        const jwtToken = jwt.sign(
            {
                id: userWithEmail.id,
                email: userWithEmail.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: jwtExpiration }
        );

        res.status(200).json({ message: "You logged in!", token: jwtToken });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "An error occurred during login" });
    }
});

router.get('/decode-jwt', (req, res) => {
    const authHeader = req.headers.authorization;
    const splitedStr = authHeader.split(' ');
    const token = splitedStr[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(500).json({ message: "Cannot decode JWT" });
        } else {
            const { id } = decodedToken;

            // Retrieve additional user information from the database based on the id
            User.findOne({ where: { id } })
                .then(user => {
                    if (!user) {
                        return res.status(404).json({ message: "User not found" });
                    }

                    // Combine the additional user information with the decoded token
                    const userWithInfo = {
                        id: user.id,
                        role_id: user.role_id,
                        name: user.name,
                        email: user.email,
                    };

                    return res.status(200).json({ user: userWithInfo });
                })
                .catch(error => {
                    console.error("Error retrieving user", error);
                    return res.status(500).json({ message: "Failed to retrieve user" });
                });
        }
    });
});

module.exports = router;