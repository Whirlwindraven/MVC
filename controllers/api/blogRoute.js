const express = require('express');
const { Blog } = require('../../models');
const withAuth = require('../../utils/authentication');

let router = express.Router();

let createBlogPost = async (req, res) => {
  let blogData = {
    ...req.body,
    user_id: req.session.user_id,
  };

  try {
    let newBlogPost = await Blog.create(blogData);
    res.status(200).json(newBlogPost);
  } catch (error) {
    res.status(400).json(error);
  }
};

let deleteBlogPost = async (req, res) => {
  let blogId = req.params.id;
  let userId = req.session.user_id;

  try {
    let deletedBlogData = await Blog.destroy({
      where: {
        id: blogId,
        user_id: userId,
      },
    });

    if (!deletedBlogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(deletedBlogData);
  } catch (error) {
    res.status(500).json(error);
  }
};

router.post('/', withAuth, createBlogPost);
router.delete('/:id', withAuth, deleteBlogPost);

module.exports = router;
