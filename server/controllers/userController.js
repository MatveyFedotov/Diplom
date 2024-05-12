const { User } = require('../models/models');
const bcrypt = require('bcrypt')
const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, role, username) => {
    return jwt.sign(
        { id, email, role, username },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    );
}


class UserController {

    async registration(req, res, next) {
        const { email, password, username, role } = req.body;
        
        try {
            // Проверка наличия email и пароля в запросе
            if (!email || !password || !username) {
                return next(ApiError.badRequest('Введите пароль или email'));
            }
            
            // Проверка существования пользователя с указанным email
            const condidat = await User.findOne({ where: { email } });
            if (condidat) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'));
            }
            
            // Генерация хэша для пароля
            const hashPassword = await bcrypt.hash(password, 5);
            
            // Создание нового пользователя с указанным email, ролью и хэшированным паролем
            const newUser = await User.create({ email, role, password: hashPassword, username});
    
            // Создание JWT токена для нового пользователя
            const token = generateJwt(newUser.id, newUser.email, newUser.role, newUser.username)
    
            // Возвращаем токен в качестве ответа на успешную регистрацию
            return res.json({ token });
        } catch (error) {
            // Обработка ошибок и передача их в следующий обработчик
            return next(ApiError.internal('Произошла ошибка при регистрации пользователя', error));
        }

       

    
}
    async login (req, res, next){
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role, user.username)
        return res.json({token})

}
async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.username)
    return res.json({token})
}
}
module.exports = new UserController();
