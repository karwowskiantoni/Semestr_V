const express = require('express');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const app = express();

app.use(express.json());
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function (req, res) {
    res.statusCode = 404;
    res.send()
});

module.exports = app;
