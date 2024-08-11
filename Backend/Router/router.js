const express = require ('express')
const router = express.Router()
const register = require ("../Controller/authController");
const { UserRegister, UserLogin, getUserDetails } = require('../Controller/authController');
const authenticateToken = require('../middleware/authMiddleware'); // Import the middleware


router.post('/register',register.UserRegister)
router.post('/login' , register.UserLogin)
router.get('/user', authenticateToken, getUserDetails);

module.exports=router;
