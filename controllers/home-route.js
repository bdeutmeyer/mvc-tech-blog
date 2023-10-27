const router = require('express').Router();
const Post = require('../models/Post');

// Route to get all posts - /home
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll();
        const posts = postData.map((post) => post.get({ plain: true }));
        // Change file name as needed later!
        res.render('all', { posts });
    } catch(err) { 
        res.status(500).json(err);
      }
    });

module.exports = router;