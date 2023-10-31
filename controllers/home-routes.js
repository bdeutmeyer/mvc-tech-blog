const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth.js');

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
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to get one post - /:id
router.get('/post/:id', withAuth, async (req, res) => {
  try {
      const postData = await Post.findByPk(req.params.id, {
          include: [{ model: Comment }, { model: User }],
      });
      if (!postData) {
          res.status(404).json({ message: 'There is no post with this id.' });
          return;
      }
      // res.status(200).json(postData)
      const post = postData.get({ plain: true });
      console.log(post, req.session);

      // res.status(200).json(post)
      res.render('single-post', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  };
});

// Render dashboard page when routed here if logged in, render user-specific info
router.get('/dashboard', async (req, res) => {
    try {

      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }, { model: Comment }],
      });

      const user = userData.get({ plain: true });

      res.render('dashboard', {
        user,
        loggedIn: true,
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

//Route to render Add Post page
router.get('/create', async (req, res) => {
  try {
      res.render('new-post', {
        loggedIn: true,
      });
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  };
});

// Route to render Update Post page
router.get('/update', withAuth, async (req, res) => {
  try {
      res.render('edit-post', {
        loggedIn: true,
      });
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  };
});

//Render login page when routed here via navbar
router.get('/login', async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  } catch (err) {
    console.log(err)
  }
});

//Render signup page when routed here via navbar
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});



module.exports = router;