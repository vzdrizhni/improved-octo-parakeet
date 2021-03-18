const express = require('express');
const {register, login, verifyUser} = require('../controllers/auth');

router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get("/confirm/:confirmationCode", verifyUser);

module.exports = router;
