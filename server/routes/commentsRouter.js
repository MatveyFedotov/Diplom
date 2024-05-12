const Router = require('express')
const router = new Router()

const commentController = require('../controllers/commentController')

router.post('/',commentController.addComment) //добавления комментария к смартфону
router.get('/:SmartphoneId', commentController.getAllComments)   //Получения комментариев
router.delete('/:id',commentController.deleteComment) //Удаление комментария



module.exports = router 