const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

//Information Expert Principle

router.post('/', async (req, res) => {
    const logedUser = await User.findOne({
        email: req.body.email
    });
    if (logedUser) {
        const validPass = await bcrypt.compare(req.body.password, logedUser.password);
        if (validPass) {
            const token = logedUser.genToken();
            res.header('x-auth-token', token).send({
                message: 'xou are logged in..',
                token: token
            });
        } else {
            res.status(400).send({
                message: 'invalid email or password'
            });
        }
    } else {
        res.status(400).send({
            message: 'invalid email or password'
        });
    }
});
module.exports = router;