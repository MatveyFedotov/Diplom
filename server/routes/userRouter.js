const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware')

const UserController = require('../controllers/userController');

router.post('/registration', UserController.registration); // Регистрация нового пользователя 
router.post('/login', UserController.login); // Авторизация
router.get('/auth', authMiddleware, UserController.check); // Проверка авторизован ли пользователь 


module.exports = router;
