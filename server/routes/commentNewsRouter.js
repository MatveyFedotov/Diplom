const Router = require('express')
const router = new Router()

const CommentsNewsController = require('../controllers/commentNewsController')

router.post('/',CommentsNewsController.addCommentNews) //добавления комментария к новости 
router.get('/:NewsId',CommentsNewsController.getAllCommentsNews)   //Получения комментариев
router.delete('/') //Удаление комментария(Для модераици)


module.exports = router 