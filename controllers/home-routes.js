const router = require('express').Router();
const {Post, User} = require('../models');

// Route to get all posts - /home
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }],
        });
        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('home', { 
            posts, 
            loggedIn: req.session.loggedIn,
        });
    } catch(err) { 
        console.log(err);
        res.status(500).json(err);
      }
});

// Route to get one post - /:id
router.get('/post/:id', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        try {
            const postData = await Post.findByPk(req.params.id, {
                include: [{ model: Comment }, { model: User} ],
            });
            if (!postData) {
                res.status(404).json({ message: 'There is no post with this id.' });
                return;
            } 
            // res.status(200).json(postData)
            const post = postData.get({ plain: true });
            res.render('single-post', { post, loggedIn: req.session.loggedIn });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        };
    };
});

//Render login page when routed here via navbar
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
});

//Render login page when routed here via navbar
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('signup');
});

module.exports = router;