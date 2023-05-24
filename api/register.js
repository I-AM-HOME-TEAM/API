const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');

const transporter = require('../transporter/emailConfig');

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

    // Generate verification token
    const verificationToken = uuidv4();
    console.log(verificationToken);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user data and verification token into the database
    const newUser = new User({ name, email, password: hashedPassword, verification_token: verificationToken, is_verified: false });
    const savedUser = await newUser.save().catch((err) => {
        console.log("Error: ", err);
        res.status(400).json({ error: "Can't register user at the moment..." });
    });

    if (savedUser) {

        const verificationLink = `http://localhost:8080/api/v1/verify/${verificationToken}`;

        // Send verification email
        const msg = {
            from: '"SweeMe Smart Home"',
            to: email,
            subject: 'Email Verification',
            html: `<p>Hello, ${name}! Thank you for registration! Please click the following link to verify your email:</p> <a href="${verificationLink}">Verify Email</a>`
        };

        const info = await transporter.sendMail(msg);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        res.status(200).json({ message:'User registered successfully! Email sent!' });
    }
});

// Email verification endpoint
router.get('/verify/:token', async (req, res) => {
    const { token } = req.params;

    try {
        // Find the user with the matching verification token
        const user = await User.findOne({ where: { verification_token: token } });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired verification token' });
        }

        // Update the user's isVerified status to true
        user.is_verified = true;
        await user.save();

        return res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        console.error('Error verifying email:', error);
        return res.status(500).json({ message: 'Failed to verify email' });
    }
});

module.exports = router;