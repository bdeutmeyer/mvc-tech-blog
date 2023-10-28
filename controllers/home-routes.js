const router = require('express').Router();
const {Post, User} = require('../models');

// Route to get all posts - /home
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }],
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        console.log(posts)

        res.render('home', { posts, 
        });
    } catch(err) { 
        res.status(500).json(err);
      }
});

router.get('/login', (req, res) => {
    // if (req.session.loggedIn) {
    //   res.redirect('/');
    //   return;
    // }
  
    res.render('login');
});

module.exports = router;