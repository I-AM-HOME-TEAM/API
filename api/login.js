const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


const router = express.Router();

// Authorisation endpoint
router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    // Check if email already exists
    const userWithEmail = await User.findOne({ where: { email } }).catch((err) => {
        console.log("Error: ", err);
    });

    // If exists - error
    if(!userWithEmail)
        return res.status(400).json({ message: "Email or password does not match..." });

    // If password is incorrect - error
    if(userWithEmail.password !== password)
        return res.status(400).json({ message: "Email or password does not match..." });

    const jwtToken = jwt.sign({
        id: userWithEmail.id,
        email: userWithEmail.email,
    }, process.env.JWT_SECRET);

    res.status(200).json({ message: "You logged in!", token: jwtToken});
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