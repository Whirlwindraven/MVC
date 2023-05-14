// Models import
const UserModel = require('./user');
const BlogModel = require('./blog');
const CommentModel = require('./comment');

// A User can own multiple Blogs
UserModel.hasMany(BlogModel, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// A Blog is owned by a User
BlogModel.belongsTo(UserModel, {
  foreignKey: 'user_id'
});

// A Blog can have many Comments
BlogModel.hasMany(CommentModel,{
  foreignKey: 'blog_id'
});

// A Comment is made by a User
CommentModel.belongsTo(UserModel, {
  foreignKey: 'user_id'
});

module.exports = { UserModel, BlogModel, CommentModel };
