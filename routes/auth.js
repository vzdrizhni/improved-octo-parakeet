const express = require('express');
const {register} = require('../controllers/auth');

router = express.Router();

router.post('/register', register);

module.exports = router;
