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

    const jwtToken = jwt.sign({ id: userWithEmail.id, email: userWithEmail.email }, process.env.JWT_SECRET);

    res.status(200).json({ message: "You logged in!", token: jwtToken});
});

module.exports = router;