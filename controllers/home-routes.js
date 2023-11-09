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

      const post = postData.get({ plain: true });
      console.log(post, req.session);

      res.status(200).json(post)
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  };
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