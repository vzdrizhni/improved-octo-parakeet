const express = require('express');

const router = express.Router();

const {createMeal} = require('../controllers/meals')

router.post('/', createMeal)

module.exports = router;