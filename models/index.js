// Models import
const User = require('./user');
const Blog = require('./blog');
const Comment= require('./comment');

// A User can own multiple Blogs
User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// A Blog is owned by a User
Blog.belongsTo(User, {
  foreignKey: 'user_id'
});

// A Blog can have many Comments
Blog.hasMany(Comment,{
  foreignKey: 'blog_id'
});

// A Comment is made by a User
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Blog, Comment };
