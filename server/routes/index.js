const Router = require('express');
const router = new Router();

const commentNewsRouter = require('./commentNewsRouter');
const commentRouter = require('./commentsRouter');
const newsRouter = require('./newsRouter');
const ratingRouter = require('./ratingRouter');
const sourseAddRouter = require('./sourseAddRouter');
const userRouter = require('./userRouter');
const SmartphoneRouter = require('./smartphoneRouter')

router.use('/user', userRouter);
router.use('/news', newsRouter);
router.use('/rating', ratingRouter);
router.use('/comment', commentRouter);
router.use('/commentnews', commentNewsRouter);
router.use('/sourse', sourseAddRouter);
router.use('/smartphone', SmartphoneRouter)

module.exports = router;
