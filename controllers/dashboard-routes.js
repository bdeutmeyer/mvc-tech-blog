const router = require('express').Router();
const { User, Post, Comment } = require('../models');
// const withAuth = require('../utils');

router.get('/',  async (req, res) => {
  try {
    const postData = await Post.findAll({
      where : {
        userId : req.session.user_id
      }
    });
    const posts = postData.map((user) => user.get({ plain: true }));
    res.render('dashboard', posts)
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

module.exports = router;