const express = require('express');

const router = express.Router({mergeParams: true});

const {
    getSingleFood,
    createFood,
    addFoodToTheMeal
} = require('../controllers/food');


router.route('/:foodId')
    .get(getSingleFood)

router.route('/')
    .post(createFood)

router.route('/addFood')
    .post(addFoodToTheMeal)

module.exports = router;