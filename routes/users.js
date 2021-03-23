const express = require('express');

const {createUserDetails} = require('../controllers/users');

const {protect} = require('../middleware/auth');

const router = express.Router();

router.post('/createuserdetails', protect, createUserDetails);

module.exports = router;