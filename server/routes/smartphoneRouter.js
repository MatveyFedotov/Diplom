const Router = require('express')
const router = new Router()


const smartphoneController = require('../controllers/smartphoneController');


router.post('/', smartphoneController.addSmartphone); // Добавить смартфон  
router.get('/all', smartphoneController.getAllSmartphones)// Получение всех смартфонов 
router.post('/poisk', smartphoneController.searchSmartphones)// поиск по заданным характеристикам 
router.delete('/:id',smartphoneController.deleteSmartphone); //Удаление смарфтона по айди для админа

module.exports = router