const express = require('express');

const router = express.Router();

const {createDay} = require('../controllers/days')

router.post('/', createDay)

module.exports = router;