const router = require('express').Router();
const { verifyToken, IsAdmin, IsUser } = require('../middleware/auth');
const userController = require('../controllers/user');

router.get('/favicon.ico', (req, res) => res.status(204));

// Register a new User
router.post('/register', userController.register);

// Login
router.post('/login', userController.login);

// Auth user only
router.get('/events', verifyToken, IsUser, userController.userEvent);

// Auth Admin only
router.get('/special', verifyToken, IsAdmin, userController.adminEvent);

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
