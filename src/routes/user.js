const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
//intentando subir rutas.

const { User } = require('../db');

router.get('/', validateToken, async (req, res) => {
    const users = await User.findAll({ where: { active: true } });
    res.json(users);
});

router.get('/:id', validateToken, async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ where: { id: id, active: true } });

    if (user) {
        return res.json([user]);
    } else {
        return res.status(404).json({ message: 'user not found' });
    }
});

router.post('/', async (req, res) => {
    const { name, lastName, address, phone, dni, email, password } = req.body;

    try {
        const newUser = {
            name,
            lastName,
            address,
            phone,
            dni,
            email,
            password,
        };
        await User.create(newUser);
        return res.json({ message: 'new user created!', user: newUser });
    } catch (err) {
        return res.json({
            message: 'phone, dni or email already exists!',
        });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (user) {
            await User.update(
                { active: false },
                {
                    where: {
                        id: id,
                    },
                }
            );
            return res.json({ message: `user ${id} deleted` });
        } else {
            return res.json({ message: 'user not found' });
        }
    } catch (err) {
        console.log(err);
        return res.json(err);
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, lastName, address, phone, dni, email, password } = req.body;

    try {
        const user = await User.findByPk(id);
        if (user) {
            const userUpdated = await User.update(
                { name, lastName, address, phone, dni, email, password },
                { where: { id: id } }
            );
            return res.json({ message: `user ${id} updated`, userUpdated });
        } else {
            return res.json({ message: 'user not found' });
        }
    } catch (err) {
        console.log(err);
        return res.json(err);
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const validation = await User.findAll({
        where: {
            email: email,
            password: password,
            active: true
        },
    });

    if (!validation.length) {
        return res.json({ message: 'user not found' });
    } else {
        const accessToken = generateAccessToken({ email, password });
        res.header('authorization', accessToken).json({
            message: 'usera auth',
            token: accessToken,
        });
        console.log('Token -> ' + accessToken);
    }
});

function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.SECRET, { expiresIn: '5m' });
}

function validateToken(req, res, next) {
    const accessToken = req.header('authorization');
    if (!accessToken) return res.status(403).json('access denied!');
    jwt.verify(accessToken, process.env.SECRET, (err) => {
        if (err) {
            return res.json({
                message: 'access denied: token invalid or expired',
            });
        } else {
            next();
        }
    });
}

module.exports = router;