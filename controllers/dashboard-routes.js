const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// /dashboard - render dashboard page
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }, { model: Comment } ],
      where : {
        user_id: req.session.user_id
      } 
    });
    const posts = postData.map((userPosts) => userPosts.get({ plain: true }));
    res.render('dashboard', 
    { ...posts,
    loggedIn: true
    });
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// /dashboard/update/:id - render update form
router.get('/update/:id', withAuth, async (req, res) => {
  try {
    const postToEdit = await Post.findByPk(req.params.id);
    const post = postToEdit.map((postedit) => postedit.get({ plain: true }));
    res.render('edit-post', 
    { post,
      loggedIn: true
    })
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;