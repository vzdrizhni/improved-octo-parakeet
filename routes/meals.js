const express = require('express');

const router = express.Router({
    mergeParams: true
});

const {
    createMeal,
    addFoodToTheMeal,
    editMeal
} = require('../controllers/meals');

const {protect} = require('../middleware/auth')

const foodRouter = require('./food');

router.use('/:mealId/food', protect, foodRouter);

router.post('/', protect, createMeal);

router.post('/:mealId/addFood', protect, addFoodToTheMeal);

router.put('/:mealId', protect, editMeal)

module.exports = router;