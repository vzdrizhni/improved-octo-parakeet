const express = require('express');

const router = express.Router({
    mergeParams: true
});

const {
    createMeal,
    addFoodToTheMeal,
    editMeal,
    deleteMeal
} = require('../controllers/meals');

const {protect, authorize} = require('../middleware/auth')

const foodRouter = require('./food');

router.use('/:mealId/food', protect, foodRouter);

router.post('/', protect, authorize('user', 'admin'), createMeal);

router.post('/:mealId/addFood', protect, addFoodToTheMeal);

router.put('/:mealId', protect, editMeal);

router.delete('/:mealId', protect, deleteMeal);

module.exports = router;