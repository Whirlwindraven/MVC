const express = require('express');
const { User } = require('../../models');

let router = express.Router();

async function handleSessionSave(req, userData, res) {
  req.session.save(() => {
    req.session.user_id = userData.id;
    req.session.logged_in = true;
    res.json({ user: userData, message: 'You are now logged in!' });
  });
}


router.route('/')
  .post(async (req, res) => {
    try {
      const userData = await User.create(req.body);
      res.status(200);
      handleSessionSave(req, userData, res);
    } catch (err) {
    res.status(400).json(err);
    }
  });

  router.route('/signup')
  .post(async (req, res) => {
    try {
      const userData = await User.create(req.body);
      res.status(200);
      handleSessionSave(req, userData, res);
    } catch (err) {
      res.status(400).json(err);
    }
  });


router.route('/login')
  .post(async (req, res) => {
    try {
      const userData = await User.findOne({ where: { username: req.body.username } });

      if (!userData || !await userData.checkPassword(req.body.password)) {
        res.status(400).json({ message: 'Incorrect username or password, please try again' });
        return;
      }

      handleSessionSave(req, userData, res);
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.route('/logout')
  .post((req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;
