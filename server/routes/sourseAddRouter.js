const Router = require('express')
const router = new Router()


// Модели и функции для работы с базой данных


// Маршрут для запуска автоматического пополнения базы данных смартфонов
router.post('/phones/auto-populate', );

// Маршрут для проверки статуса автоматического пополнения базы данных смартфонов
router.get('/phones/auto-populate/status', );

// Маршрут для получения списка всех смартфонов в базе данных
router.get('/phones', );

// Маршрут для получения информации о конкретном смартфоне по его идентификатору
router.get('/phones/:id', );

module.exports = router;
