const express = require('express');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('./models/user'); // модель користувача
const UserRepository = require('./repositories/user-repository'); // репозиторій користувача

const application = require('./server');



const app = express();
const userRepository = new UserRepository();

// middleware для розбору JSON з тіла запиту
app.use(express.json());

// ендпоінт для реєстрації
app.post('/register', [
    check('email').isEmail(),
    check('password').isLength({ min: 8 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // перевірка, чи користувач з таким email вже зареєстрований
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
        return res.status(409).json({ message: 'Користувач з таким email уже існує' });
    }

    // хешування пароля перед збереженням в БД
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User(email, hashedPassword);
    await userRepository.save(newUser);

    return res.status(201).json({ message: 'Користувач успішно зареєстрований' });
});

// ендпоінт для авторизації
app.post('/login', [
    check('email').isEmail(),
    check('password').isLength({ min: 8 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // пошук користувача за email
    const user = await userRepository.findByEmail(email);
    if (!user) {
        return res.status(401).json({ message: 'Неправильні дані для входу' });
    }

    // перевірка, чи пароль збігається
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Неправильні дані для входу' });
    }

    const token = jwt.sign({ userId: user.id }, 'secret_key', { expiresIn: '1h' });

    // повертаємо відповідь з токеном
    res.status(200).json({
        message: 'Авторизація пройшла успішно',
        token: token,
        expiresIn: 3600 // кількість секунд до закінчення токена
    });
    app.listen(3000, () => {
        console.log('Server started on port 3000 - app.js');
    });
});