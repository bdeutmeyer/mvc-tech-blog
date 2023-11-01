const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }, { model: Comment } ],
      where : {
        user_id: req.session.user_id
      } 
    });
console.log(postData)
    const posts = postData.map((userPosts) => userPosts.get({ plain: true }));
console.log(posts)
    // res.render('dashboard', 
    // { ...posts,
    // loggedIn: true
    // });
    res.status(200).json(postData)
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

  // router.put, router.delete

module.exports = router;