import {Product} from "../entities/Product";

const express = require('express');
const router = express.Router();


router.get('/', async function (req, res) {

    const product = new Product("ciastka", "takie sobie ciastka, średnio smaczne", 10, 100)
    await product.save();
    res.send('products');
});

module.exports = router;
