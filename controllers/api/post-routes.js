const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

//Route to render Add Post page
router.get('/', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        try {
            res.render('new-post');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        };
    };
});


// Route to get one post - /:id
router.get('/:id', async (req, res) => {
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

            // res.status(200).json(post)
            res.render('single-post', { post, loggedIn: req.session.loggedIn });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        };
    };
});

// Route to create a new post
router.post('/', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        try {
            const postData = await Post.create(req.body);
            res.render('new-post', { postData })
        } catch (err) {
            res.status(500).json(err);
        }
    };
});

// Route to update a post
router.put('/:id', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    // } else if (postData.user_id !== postData.user.id) {
    //     res.status(404).json({message: ''})
    } else {
        try {
            const updatedPost = await Post.update(
                {
                    title: req.body.title,
                    content: req.body.content
                },
                {
                    include: [{ model: Comment }, { model: User} ],
                    where: {
                        id: req.params.id,
                    },
                }
            );
            res.status(200).json(updatedPost);
            // res.redirect(`/user`)
        } catch (err) {
            res.status(500).json(err);
        };
    };
});

// Delete a post
router.delete('/:id', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
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
    };
});

// Route to create a new comment
router.post('/:id', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
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
        };
    };
});

module.exports = router;