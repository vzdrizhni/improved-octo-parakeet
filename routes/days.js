const express = require('express');

const router = express.Router();

const mealRouter = require('./meals');

const {protect, authorize} = require('../middleware/auth')

router.use('/:dayId/meals', mealRouter);

const {createDay, getDay, getDays} = require('../controllers/days')

router.post('/', protect, createDay);

router.get('/:dayId', getDay);

router.get('/', getDays);

module.exports = router;