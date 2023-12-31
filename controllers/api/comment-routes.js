const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to update a comment
router.put('/:id', withAuth, async (req, res) => {
  try {
    const post = await Comment.update(
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

// Delete a comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const deleteComment = await Comment.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!deleteComment) {
        res.status(404).json({ message: 'No comment with this id!' });
        return;
      }
      res.status(200).json(deleteComment);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;