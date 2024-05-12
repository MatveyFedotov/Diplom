const {CommentsNews} = require("../models/models")
const ApiError = require('../error/ApiError');


class CommentsNewsController {
// Добавление комментария к новости
async  addCommentNews(req, res, next) {
    try {
        const { comment_text, UserId, NewsId } = req.body;
        const comment = await CommentsNews.create({ comment_text, NewsId, UserId });
        return res.status(201).json(comment);
    } catch (error) {
        next(ApiError.internal('Произошла ошибка при добавлении комментария'));
    }
}

// Получение всех комментариев новости
async  getAllCommentsNews(req, res, next) {

    try {
        const { NewsId } = req.params;

        // Находим все комментарии для заданной новости
        const comments = await CommentsNews.findAll({ where: { NewsId } });

        // Проверяем, найдены ли комментарии
        if (!comments || comments.length === 0) {
            return res.status(404).json({ message: 'Комментарии для этой новости  не найдены' });
        }
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

module.exports = new CommentsNewsController()