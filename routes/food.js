const express = require('express');

const router = express.Router();

const {
    getSingleFood,
    createFood
} = require('../controllers/food');


router.route('/:foodId')
    .get(getSingleFood)

router.route('/')
    .post(createFood)

module.exports = router;