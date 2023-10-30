const router = require('express').Router();
const {Post, User, Comments } = require('../models');

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


//Render login page when routed here via navbar
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
});

//Render signup page when routed here via navbar
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('signup');
});

//Render dashboard page when routed here via navbar
router.get('/:id', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('dashboard');
});

module.exports = router;