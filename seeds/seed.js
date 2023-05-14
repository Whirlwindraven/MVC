const { User, Post, Comment } = require('../models');
const sequelizeConnection = require('../config/connection');

// Incorporate data from JSON files
const dataUser = require('./userData.json');
const dataBlog = require('./blogData.json');
const dataComment = require('./commentData.json');

// Populate database function
const populateDatabase = async () => {
    await sequelizeConnection.sync({ force: true });

    // Generate user data
    const userInstances = await User.bulkCreate(dataUser, {
      individualHooks: true,
      returning: true,
    });

    // Generate blog data
    for (const singleBlog of dataBlog) {
      await Blog.create({
        ...singleBlog,
        user_id: userInstances[Math.floor(Math.random() * userInstances.length)].id,
      });
    }

    // Generate comment data
    const commentInstances = await Comment.bulkCreate(dataComment, {
      individualHooks: true,
      returning: true,
    });

    process.exit(0);
};

populateDatabase();
