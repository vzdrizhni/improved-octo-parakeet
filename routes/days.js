const express = require('express');

const router = express.Router();

const mealRouter = require('./meals');

const {protect, authorize} = require('../middleware/auth')

router.use('/:dayId/meals', mealRouter);

const {createDay, getDay, getDays, deleteDay, editDay} = require('../controllers/days')

router.post('/', protect, createDay);

router.get('/:dayId', protect, getDay);

router.get('/', protect, getDays);

router.delete('/:dayId', protect, deleteDay);

router.put('/:dayId', protect, editDay);

module.exports = router;