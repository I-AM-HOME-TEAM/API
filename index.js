const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const UserRepository = require('./repositories/user-repository');
const jwt = require('jsonwebtoken');

const app = express();
const userRepository = new UserRepository();

app.use(express.json());

// GET request
app.get('/', (req, res) => {
    res.send('Server is working');
});

// GET request with query parameter
app.get('/test', (req, res) => {
    const testParam = req.query.test;
    if (testParam % 2 === 0) {
        res.send('even');
    } else {
        res.send('odd');
    }
});

// POST request
app.post('/register', [
    check('email').isEmail(),
    check('password').isLength({ min: 8 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
        return res.status(409).json({ message: 'Користувач з таким email уже існує' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User(email, hashedPassword);
    await userRepository.save(newUser);

    return res.status(201).json({ message: 'Користувач успішно зареєстрований' });
});

// POST request
app.post('/login', [
    check('email').isEmail(),
    check('password').isLength({ min: 8 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userRepository.findByEmail(email);
    if (!user) {
        return res.status(401).json({ message: 'Неправильні дані для входу' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Неправильні дані для входу' });
    }

    const token = jwt.sign({ userId: user.id }, 'secret_key', { expiresIn: '1h' });

    res.status(200).json({
        message: 'Авторизація пройшла успішно',
        token: token,
        expiresIn: 3600
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
