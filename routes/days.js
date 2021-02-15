const express = require('express');

const mealRouter = require('./meals');

const router = express.Router();

const {createDay} = require('../controllers/days')

router.use('/:dayId/meals', mealRouter);

router.post('/', createDay)

module.exports = router;