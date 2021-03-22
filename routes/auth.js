const express = require('express');
const {register, login, verifyUser, forgotPassword, resetPassword, logout} = require('../controllers/auth');

router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get("/confirm/:confirmationCode", verifyUser);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);
router.delete('/logout', logout);

module.exports = router;
