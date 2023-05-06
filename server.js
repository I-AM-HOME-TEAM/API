const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const UserRepository = require('./repositories/user-repository');
const jwt = require('jsonwebtoken');
const app = express();
const userRepository = new UserRepository();

const db = require('./models');

app.use(express.json());

// GET request
app.get('/', (req, res) => {
    res.send('Server is working');
});

// POST request
app.post('/register', [
    check('email').isEmail(),
    check('password').isLength({ min: 8 }).withMessage('Пароль має містити принаймні 8 символів'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password} = req.body;

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
        return res.status(409).json({message: 'Користувач з таким email уже існує'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.User.create({name: name, email: email, password: hashedPassword});
    await userRepository.save(newUser);

    return res.status(201).json({message: 'Користувач успішно зареєстрований'});
});

/*
*   TODO: Fix problem that after server restart credentials is no longer available but in db all information is stored.
*   TODO: Optimize project. Make server.js run ONLY SERVER and app.js only endpoints.
*   TODO: Figure out what to write in database.js :)
*/

// POST request
app.post('/login', [
    check('email').isEmail(),
    check('password').isLength({ min: 8 }).withMessage('Пароль має містити принаймні 8 символів'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    const user = await userRepository.findByEmail(email);
    if (!user) {
        return res.status(401).json({ message: 'Неправильні дані для входу' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Неправильні дані для входу' });
    }

    if (user.name !== name) {
        return res.status(401).json({ message: 'Неправильні дані для входу' });
    }

    const token = jwt.sign({ userId: user.id }, 'secret_key', { expiresIn: '1h' });

    res.status(200).json({
        message: 'Авторизація пройшла успішно',
        token: token,
        expiresIn: 3600
    });
});

db.sequelize.sync().then((req) =>
{
    app.listen(3000, () => {
        console.log('Server started on port 3000');
    });
});
