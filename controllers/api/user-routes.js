const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Post } = require('../../models');

// Dashboard page routes
router.get('/:id', async (req, res) => {
  //   if (!req.session.loggedIn) {
  //     res.redirect('/login');
  // } else { 
  try {
    const thisUsersPosts = await User.findByPk(req.params.id, {
      include: [{ model: Post }]
    });
    if (!thisUsersPosts) {
      res.status(404).json({ message: 'You do not have any posts yet!' });
      return;
    }
    res.status(200).json(thisUsersPosts);
  } catch (err) {
    res.status(500).json(err);
  }

  // }
});

// Sign up new user
router.post('/signup', async (req, res) => {
  try {
    const newUser = req.body;
    newUser.password = await bcrypt.hash(req.body.password, 10);
    
    const newUserData = await User.create(newUser);

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
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

    const validPassword = await bcrypt.compare(
      req.body.password,
      dbUserData.password
    );

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

module.exports = router;