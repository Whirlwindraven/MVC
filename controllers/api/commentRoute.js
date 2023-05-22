const express = require('express');
const { Comment } = require('../../models');
const withAuth = require('../../utils/authentication');

let router = express.Router();

router.route('/')
  .get(async (req, res) => {
    try {
      const comments = await Comment.findAll({});
      res.json(comments);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  })
  .post(async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      res.json(newComment);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.route('/:id')
  .get(async (req, res) => {
    try {
      const commentData = await Comment.findAll({
        where: {
          id: req.params.id
        }
      });
      res.json(commentData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  })
  .delete(withAuth, async (req, res) => {
    try {
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
      if (!commentData) {
        res.status(404).json({ message: 'No blog found with this id!' });
        return;
      }
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;