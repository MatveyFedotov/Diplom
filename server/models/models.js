const sequelize = require('../db');
const { DataTypes } = require('sequelize');

// Определение модели User
const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('admin', 'user'), allowNull: false, defaultValue: 'user' }
    //date_registered: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

// Определение модели Smartphone
const Smartphone = sequelize.define('Smartphone', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    brand: { type: DataTypes.STRING},
    operating_system: { type: DataTypes.STRING},
    model: { type: DataTypes.STRING},
    release_year: { type: DataTypes.INTEGER },
    price: { type: DataTypes.FLOAT},
    description: { type: DataTypes.TEXT },
    ram: { type: DataTypes.INTEGER},
    camera: { type: DataTypes.STRING},
    processor: { type: DataTypes.STRING},
    img: {type: DataTypes.STRING},
    screen_size: { type: DataTypes.FLOAT }  
});

// Определение модели Rating
const SmartphoneRating = sequelize.define('SmartphoneRating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rating: { type: DataTypes.FLOAT, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    smartphone_id: { type: DataTypes.INTEGER, allowNull: false }
    // review_text: { type: DataTypes.TEXT },
    //date_posted: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

// Определение модели Admin
// const Admin = sequelize.define('Admin', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     username: { type: DataTypes.STRING, allowNull: false, unique: true },
//     email: { type: DataTypes.STRING, allowNull: false, unique: true },
//     password: { type: DataTypes.STRING, allowNull: false },
//     //date_registered: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
// });

// Определение модели Comment
const Comment = sequelize.define('Comment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    comment_text: { type: DataTypes.TEXT, allowNull: false },
    //user_id: { type: DataTypes.INTEGER, allowNull: false },
   // smartphone_id: { type: DataTypes.INTEGER, allowNull: false }
   // date_posted: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

// Определение модели Image
const FeedBack = sequelize.define('FeedBack', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    feedback_text: { type: DataTypes.TEXT, allowNull: false}

});

const CommentsNews = sequelize.define('CommentsNews', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    comment_text: { type: DataTypes.TEXT, allowNull: false }
    // user_id: { type: DataTypes.INTEGER, allowNull: false },
    // news_id: { type: DataTypes.INTEGER }
});
// Определение модели Category
const DataSourse = sequelize.define('DataSourse', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    url_sourse:{type: DataTypes.STRING}
});
const News = sequelize.define('News', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.STRING, allowNull: false},
    title:{type: DataTypes.STRING,unique: true },
    img: {type: DataTypes.STRING}
});

// Определение связей между моделями
User.hasMany(FeedBack);
FeedBack.belongsTo(User);

User.hasMany(SmartphoneRating);
SmartphoneRating.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

User.hasMany(CommentsNews);
CommentsNews.belongsTo(User);

Smartphone.hasMany(Comment);
Comment.belongsTo(Smartphone);

Smartphone.hasMany(SmartphoneRating);
SmartphoneRating.belongsTo(Smartphone);

News.hasMany(CommentsNews);
CommentsNews.belongsTo(News);




module.exports = {
    User,
    Smartphone,
    Comment,
    SmartphoneRating,
    News,
    CommentsNews,
    DataSourse,
    FeedBack
};
