const {News} = require("../models/models")
const ApiError = require('../error/ApiError');


class NewsController {
// Добавление комментария к смартфону
async  addNews(req, res, next) {
    try {
        const { content, title} = req.body;
        const news = await News.create({ content, title});
        return res.status(201).json(news);
    } catch (error) {
        next(ApiError.internal('Произошла ошибка при добавлении новости'));
    }
}

// Получение всех комментариев смартфона
async  getAllNews(req, res, next) {

    try {
        // Получение всех новостей из базы данных
        const allNews = await News.findAll();

        // Проверка наличия новостей
        if (!allNews || allNews.length === 0) {
            return res.status(404).json({ message: 'Новости не найдены' });
        }

        // Возвращаем список всех новостей
        return res.json(allNews);
    } catch (error) {
        next(ApiError.internal('Произошла ошибка при получении новостей'));
    }
}
}

module.exports = new NewsController()