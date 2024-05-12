const Router = require('express')
const router = new Router()
const NewsController = require('../controllers/newsController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('admin'),NewsController.addNews) //добавление новой новости 
router.get('/', NewsController.getAllNews)   //Получения всех нвовостей 



module.exports = router 