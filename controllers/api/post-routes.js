const router = require('express').Router();
const { Post, Comment } = require('../../models');

// Route to get one post - /api/post/:id
router.get('/:id', async (req, res) => {
    try{ 
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: Comment }],
        });
        if(!postData) {
            res.status(404).json({message: 'There is no post with this id.'});
            return;
        }
        res.status(200).json(postData)
        // const post = postData.get({ plain: true });
        // res.render('post', post);
    } catch (err) {
        res.status(500).json(err);
    };     
});

// Route to create a new comment
router.post('/:id', async (req, res) => {
    try {
        console.log(req.params.id)
      const commentData = await Comment.create({
          content: req.body.content,
          user_id: req.body.user_id,
          post_id: req.params.id
      });
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Route to create a new post
router.post('/', async (req, res) => {
  try {
    const postData = await Post.create(req.body);
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to update a post
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.update(
      {
        content: req.body.content
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
    try {
      const deletePost = await Post.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!deletePost) {
        res.status(404).json({ message: 'No post with this id!' });
        return;
      }
      res.status(200).json(deletePost);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;