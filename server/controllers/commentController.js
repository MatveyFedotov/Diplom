const {Comment} = require("../models/models")
const ApiError = require('../error/ApiError');


class CommentController {
// Добавление комментария к смартфону
async  addComment(req, res, next) {
    try {
        const { comment_text, UserId, SmartphoneId } = req.body;
        const comment = await Comment.create({ comment_text, SmartphoneId, UserId });
        return res.status(201).json(comment);
    } catch (error) {
        next(ApiError.internal('Произошла ошибка при добавлении комментария'));
    }
}

// Получение всех комментариев смартфона
async  getAllComments(req, res, next) {

    try {
        const { SmartphoneId } = req.params;

        // Находим все комментарии для заданного смартфона
        const comments = await Comment.findAll({ where: { SmartphoneId } });

        // Проверяем, найдены ли комментарии
        if (!comments || comments.length === 0) {
            return res.status(404).json({ message: 'Комментарии для этого смартфона не найдены' });
        }

        // Отправляем найденные комментарии в ответе
        return res.json(comments);
    } catch (error) {
        // Обрабатываем возможные ошибки
        return res.status(500).json({ error: 'Произошла ошибка при получении комментариев', details: error.message });
    }
}





// Удаление комментария
async  deleteComment(req, res, next) {
    try {
        const { id } = req.params;
        const deletedComment = await Comment.destroy({where: {id}})
        if (!deletedComment) {
            return res.status(404).json({ message: 'Комментарий не найден' });
        }
        return res.json({ message: 'Комментарий успешно удален' });
    } catch (error) {
        next(ApiError.internal('Произошла ошибка при удалении комментария'));
    }
}
}

module.exports = new CommentController()