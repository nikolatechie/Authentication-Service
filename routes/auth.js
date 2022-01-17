const router = require('express').Router();
const userController = require('../controllers/user.controller');

// Register a new User
router.post('/register', userController.register);

// Login
router.post('/login', userController.login);

router.get("/test", userController.authenticateToken, userController.test);

module.exports = router;