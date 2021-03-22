const express = require('express');

const {createUserDetails} = require('../controllers/users');

const router = express.Router();

router.post('/', createUserDetails);

module.exports = router;