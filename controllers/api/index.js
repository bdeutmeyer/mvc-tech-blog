const router = require('express').Router();

const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');
const userRoutes = require('./user-routes');

// Full route: /api/post
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);
router.use('/user', userRoutes);

module.exports = router;