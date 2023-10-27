const router = require('express').Router();

const homeRoute = require('../home-route');
const postRoutes = require('./post-routes');
// const commentRoutes = require('./comment-routes')

// Full route: /api/post || /api/comment
router.use('/home', homeRoute);
router.use('/post', postRoutes);
// router.use('/comment', commentRoutes);

module.exports = router;