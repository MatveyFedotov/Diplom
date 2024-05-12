const { Smartphone } = require('../models/models');

const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError');
const { off } = require('process');

class SmartphoneController {


    //Добавление смартофана 
    async addSmartphone(req, res, next) {
        try {
            let { brand, operating_system, model, release_year, price, description, ram, camera,  processor, screen_size } = req.body;
            // if (!req.files || !req.files.img) {
            //     return res.status(400).json({ message: "Файл изображения не найден в запросе" });
            // }
             const { img } = req.files
             let fileName = uuid.v4() + ".jpg";
             img.mv(path.resolve(__dirname, '..', 'static', fileName));
    
            const newSmartphone = await Smartphone.create({
                brand,
                operating_system,
                model,
                release_year,
                price,
                description,
                ram,
                camera,
                processor,
                img: fileName,
                screen_size
            });
            
            return res.status(201).json({ message: 'Новый смартфон успешно добавлен', smartphone: newSmartphone });
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        
    }
    

    //Поиск сматрфона по характеристикам
    async searchSmartphones(req, res) {
        const { brand, operating_system, price, screen_size, processor, ram, camera } = req.body;

        try {
            // Формируем объект с параметрами поиска для запроса к базе данных
            const searchParams = {
                where: {}
            };

            // Проверяем, передан ли каждый параметр поиска и добавляем его к объекту searchParams
            if (brand) searchParams.where.brand = brand;
            if (operating_system) searchParams.where.operating_system = operating_system;
            if (price) searchParams.where.price = price;
            if (screen_size) searchParams.where.screen_size = screen_size;
            if (processor) searchParams.where.processor = processor;
            if (ram) searchParams.where.ram = ram;
            if (camera) searchParams.where.camera = camera;

            // Ищем смартфоны в базе данных, соответствующие заданным параметрам
            const smartphones = await Smartphone.findAll(searchParams);

            // Возвращаем найденные смартфоны
            return res.status(200).json({ message: 'Смартфоны найдены', smartphones });
        } catch (error) {
            // Если произошла ошибка, отправляем ответ с сообщением об ошибке
            return res.status(500).json({ error: 'Произошла ошибка при поиске смартфонов', details: error });
        }
    }


    //Удаление смартфона 
    async deleteSmartphone(req, res) {
        const { id } = req.params; // Получаем ID смартфона из параметров запроса

        try {
            // Пытаемся найти смартфон по его ID
            const smartphone = await Smartphone.findByPk(id);

            // Если смартфон не найден, возвращаем ошибку 404
            if (!smartphone) {
                return res.status(404).json({ error: 'Смартфон не найден' });
            }

            // Удаляем смартфон из базы данных
            await smartphone.destroy();

            // Возвращаем успешное сообщение об удалении
            return res.status(200).json({ message: 'Смартфон успешно удален' });
        } catch (error) {
            // Если произошла ошибка, отправляем ответ с сообщением об ошибке
            return res.status(500).json({ error: 'Произошла ошибка при удалении смартфона', details: error });
        }
    }
    async getAllSmartphones(req, res) {
        try {

            let{limit,page} = req.query

            page = page || 1
            limit = limit || 9
            let offset = page * limit - limit
            // Ищем все смартфоны в базе данных
            const smartphones = await Smartphone.findAll({limit, offset});

            // Возвращаем найденные смартфоны
            return res.status(200).json({ message: 'Список всех смартфонов', smartphones });
        } catch (error) {
            // Если произошла ошибка, отправляем ответ с сообщением об ошибке
            return res.status(500).json({ error: 'Произошла ошибка при получении списка смартфонов', details: error });
        }
    }

}
module.exports = new SmartphoneController();
