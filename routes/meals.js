const express = require('express');

const router = express.Router({
    mergeParams: true
});

const {
    createMeal,
    addFoodToTheMeal
} = require('../controllers/meals');

const foodRouter = require('./food');

router.use('/:mealId/food', foodRouter);

router.post('/', createMeal);

router.post('/:mealId/addFood', addFoodToTheMeal);

module.exports = router;