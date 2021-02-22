const express = require('express');

const router = express.Router({
    mergeParams: true
});

const {
    createMeal
} = require('../controllers/meals');

const foodRouter = require('./food');

router.use('/:mealId/food', foodRouter);

router.post('/', createMeal);

module.exports = router;