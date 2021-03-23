const express = require('express');

const {createUserDetails, editUserDetails} = require('../controllers/users');

const {protect} = require('../middleware/auth');

const router = express.Router();

router.post('/createuserdetails', protect, createUserDetails);

router.put('/edituserdetails/:detailsId', protect, editUserDetails);

module.exports = router;