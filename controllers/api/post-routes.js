const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to add new post to database
router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        // Use user id to fetch username
        const postWithUsername = await Post.findByPk(postData.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        res.status(200).json(postWithUsername);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to get one post - /:id
router.get('/singlepost/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: Comment,
                include: { model: User }
            
            }],
        });
        if (!postData) {
            res.status(404).json({ message: 'There is no post with this id.' });
            return;
        }

        const post = postData.get({ plain: true });
// res.status(200).json(post)
        res.render('single-post', { 
            post,
            loggedIn: req.session.loggedIn
        }
        );
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// Route to update a post
router.put('/update/:id', withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.update(
            {
                title: req.body.title,
                content: req.body.content
            },
            {
                include: [{ model: Comment }, { model: User }],
                where: {
                    id: req.params.id,
                },
            }
        );
        res.status(200).json(updatedPost)
    } catch (err) {
        res.status(500).json(err);
    };

});

// Delete a post
router.delete('/delete/:id', withAuth, async (req, res) => {
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
    };
  });

// Route to create a new comment
router.post('/addcomment/:id', withAuth, async (req, res) => {
    try {
        const post_id = parseInt(req.params.id);
        console.log(post_id)
        console.log(req.body.content)
        console.log(req.session.user_id)
        const commentData = await Comment.create({
            content: req.body.content,
            user_id: req.session.user_id,
            post_id: post_id
        });
        const commentWithUsername = await Comment.findByPk(commentData.id, {
            include: [
                {
                    model: User,
                  attributes: ['username'],
                },
            ]
        });
        res.status(200).json(commentWithUsername);
    } catch (err) {
        res.status(500).json(err); 
    };
});

module.exports = router;