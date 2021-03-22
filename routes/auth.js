const express = require('express');
const {register, login, verifyUser, forgotPassword, resetPassword, logout, updateDetails} = require('../controllers/auth');

const {protect} = require('../middleware/auth');

router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get("/confirm/:confirmationCode", verifyUser);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);
router.delete('/logout', logout);
router.put('/updatedetails', protect, updateDetails);

module.exports = router;
