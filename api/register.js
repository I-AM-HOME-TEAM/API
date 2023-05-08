const express = require('express');
const User = require('../models/user');

const router = express.Router();

// Registration endpoint
router.post('/register', async (req, res) => {

    const { name, email, password } = req.body;

    // Check if password is 8 symbols long
    if (password.length < 8) {
        return res.status(400).json({ error: "Password should be at least 8 characters long" });
    }

    // Check if user already exists
    const userAlreadyExists = await User.findOne({ where: { email } }).catch((err) => {
        console.log("Error: ", err);
    });

    if(userAlreadyExists){
        return res.status(400).json({ message: "User with this email already exists"});
    }

    // Insert info to DB
    const newUser = new User({ name, email, password });
    const savedUser = await newUser.save().catch((err) => {
        console.log("Error: ", err);
        res.status(400).json({ error: "Can't register user at the moment..." });
    });

    if(savedUser) res.status(200).json({ message: "User registered successfully!" });

});

module.exports = router;