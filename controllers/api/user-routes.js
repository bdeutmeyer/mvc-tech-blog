const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

//See all users (delete later - just for dev)
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
        include: [{ model: Post }, { model: Comment }],
    });
    const users = userData.map((user) => user.get({ plain: true }));
    res.status(200).json(userData);
  }
 catch (err) { 
    console.log(err);
    res.status(500).json(err);
  }
})

// Sign up new user
router.post('/signup', async (req, res) => {
  try {
    const newUserData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    console.log(newUserData)
    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(newUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Dashboard page routes
router.get('/:id', async (req, res) => {
    if (!req.session.loggedIn) {
      res.redirect('/login');
  } else { 
  try {
    const thisUsersPosts = await User.findByPk(req.params.id, {
      include: [{ model: Post }, {model: Comment}]
    });
    if (!thisUsersPosts) {
      res.status(404).json({ message: 'You do not have any posts yet!' });
      return;
    }
    res.status(200).json(thisUsersPosts);
  } catch (err) {
    res.status(500).json(err);
  }``

  }
});

module.exports = router;