const express = require('express');

const router = express.Router();

const mealRouter = require('./meals');

router.use('/:dayId/meals', mealRouter);

const {createDay, getDay} = require('../controllers/days')

router.post('/', createDay);

router.get('/:dayId', getDay);

module.exports = router;