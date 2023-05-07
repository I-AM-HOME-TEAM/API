const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


const router = express.Router();

//Ендпоінт для авторизації
router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    //Перевірка чи існує користувач з таким email
    const userWithEmail = await User.findOne({ where: { email } }).catch((err) => {
        console.log("Error: ", err);
    });

    //Якщо ні - помилка
    if(!userWithEmail)
        return res.status(400).json({ message: "Email or password does not match..." });

    //Якщо пароль не відповідє запису в базі - помилка
    if(userWithEmail.password !== password)
        return res.status(400).json({ message: "Email or password does not match..." });

    const jwtToken = jwt.sign({ id: userWithEmail.id, email: userWithEmail.email }, process.env.JWT_SECRET);

    res.status(200).json({ message: "You logged in!", token: jwtToken});
});

module.exports = router;