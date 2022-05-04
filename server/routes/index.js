const router = require('express').Router();
const { verifyToken, IsAdmin, IsUser } = require('../middleware/auth');
const userController = require('../controllers/user');
const educationController = require('../controllers/education');

router.get('/favicon.ico', (req, res) => res.status(204));

// Register a new User
router.post('/register', userController.register);

// Login
router.post('/login', userController.login);

// Auth user only
router.get('/events', verifyToken, IsUser, userController.userEvent);

// Auth Admin only
router.get('/special', verifyToken, IsAdmin, userController.adminEvent);

// Education routes...
router.get('/user', verifyToken, userController.getUser);
router.get('/users', verifyToken, IsAdmin, userController.getAllUsers);
// router.post('/user', verifyToken, userController.addEducation);
router.put('/user', verifyToken, userController.updateUser);

// Education routes...
router.get('/education', verifyToken, educationController.getEducation);
router.post('/education', verifyToken, educationController.addEducation);
router.put('/education', verifyToken, educationController.updateEducation);

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
