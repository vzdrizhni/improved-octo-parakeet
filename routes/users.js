const express = require('express');

const {createUserDetails, editUserDetails, getUserDetails} = require('../controllers/users');

const {protect} = require('../middleware/auth');

const router = express.Router();

router.post('/createuserdetails', protect, createUserDetails);

router.put('/edituserdetails/:detailsId', protect, editUserDetails);

router.get('/getuserdetails/:detailsId', protect, getUserDetails);

module.exports = router;