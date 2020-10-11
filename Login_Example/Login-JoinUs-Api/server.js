require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const UserRouter = require('./routes/users');
const AuthRouter = require('./routes/auth');

//Initialize app with express
const app = express();

// update to match the domain you will make the request from
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,x-auth-token, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,PATCH, OPTIONS");
    next();
});

app.use(bodyparser.json());
app.use(express.json());
//app.use(testmiddleware);
app.use('/api/users', UserRouter);
app.use('/api/auth', AuthRouter);

//Database Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DATABASE Connected');
}).catch((error) => {
    console.log(error.message);
});

const _PORT = process.env.PORT;

app.listen(_PORT, () => {
    console.log('Server Started');
});