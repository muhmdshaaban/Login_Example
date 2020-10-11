const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const authMiddleware = require('../middleware/auth');
const isAdminMidleWare = require('../middleware/admin');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        let newUser = await User.findOne({
            'email': req.body.email
        });
        if (newUser) {
            res.status(400).send({
                message: 'User already exists'
            });
        } else {
            // newUser = new User({
            //     name: req.body.name,
            //     email: req.body.email,
            //     password: req.body.password
            // });
            // const hashed = await bcrypt.hash(newUser.password, 10);
            // newUser.password = hashed;
            // const saveduser = await newUser.save();

            // const token = saveduser.genToken();
            // res.header('x-auth-token', token).send({
            //     name: saveduser.name,
            //     email: saveduser.email
            // });
            try {
                newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
                const hash = await bcrypt.hash(newUser.password, 10);
                newUser.password = hash;
                const result = await newUser.save();
                const token = result.genToken();
                res.header("x-auth-token", token).send({
                    message: "congratulation sir",
                    token: token
                });
            } catch (error) {
                res.status(400).send(error.message)
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get('/me', authMiddleware, async (req, res) => {
    try {
        const myProfile = await User.findById(req.user._id).select('-password');
        res.send(myProfile);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get('/', [authMiddleware, isAdminMidleWare], async (req, res) => {
    try {
        const allUser = await User.find().select('-password');
        res.send(allUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.put('/:id', [authMiddleware], async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            isAdmin: req.body.isadmin
        }, {
            new: true
        })

        res.send(user);
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.delete('/:id', [authMiddleware], async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        res.send(user);
    } catch (error) {
        res.status(400).send(error.message)
    }
});

module.exports = router;