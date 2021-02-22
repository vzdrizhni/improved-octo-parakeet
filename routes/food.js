const express = require('express');

const router = express.Router({mergeParams: true});

const {
    getSingleFood,
    createFood,
} = require('../controllers/food');


router.route('/:foodId')
    .get(getSingleFood)

router.route('/')
    .post(createFood)

module.exports = router;