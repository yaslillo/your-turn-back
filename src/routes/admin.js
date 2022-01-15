const { Router } = require("express");
const router = Router();
const { Admin } = require("../db");
const jwt = require('jsonwebtoken');

router.get("/", validateToken,async (req, res) => {
    const admins = await Admin.findAll({ where: { active: true } });
    res.json(admins)
})

router.get("/:id",validateToken, async (req, res) => {
    const { id } = req.params;
    const admin = await Admin.findByPk({ where: { id: id, active: true } });
    if (admin) {
        return res.send(admin)
    } else {
        return res.status(404).json({ message: 'admin not found' })
    }
})


router.post("/", async (req, res) => {
    const { name, lastName, email, password } = req.body;

    try {
        const newAdmin = {
            name,
            lastName,
            email,
            password,
        };
        await Admin.create(newAdmin);
        return res.json({ message: 'new admin created!', admin: newAdmin });
    } catch (err) {
        return res.json({
            message: 'phone, dni or email already exists!',
        });
    }
});
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;
    Admin
    .update(body, {
        where: {
            id,
        },
    })
    .then(() => {
        res.send('Actualizado correctamente');
    })
    .catch((error) => next(error));
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    try{
        const admin = await Admin.findByPk(id);
        if(admin){
            await Admin.update(
                {active:false},
                {   where:{
                    id: id,
                    },
                }
            );
            return res.json({ message: `admin ${id} deleted`})
        }else{
            return res.json({message: 'user not found '})
        };
    }catch(error){
        return res.json(error)}
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const validation = await Admin.findAll({
        where: {
            email: email,
            password: password,
            active: true
        },
    });


    if (!validation.length) {
        return res.json({ message: 'admin not found' });
    } else {
        const accessToken = generateAccessToken({ email, password });
        res.header('authorization', accessToken).json({
            message: 'admin auth',
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