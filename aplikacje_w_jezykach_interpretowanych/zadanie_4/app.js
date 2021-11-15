import "reflect-metadata";

const express = require('express');
const indexRouter = require('./src/routes/index');
const productsRouter = require('./src/routes/products');
const app = express();

app.use(express.json());
app.use('/', indexRouter);
app.use('/products', productsRouter);


app.use(function (req, res) {
    res.statusCode = 404;
    res.send()
});

module.exports = app;
