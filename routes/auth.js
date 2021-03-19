const express = require('express');
const {register, login, verifyUser, forgotPassword} = require('../controllers/auth');

router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get("/confirm/:confirmationCode", verifyUser);
router.get("/forgotpassword", verifyUser);

module.exports = router;
