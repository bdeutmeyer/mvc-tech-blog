// Import models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Each user has many posts
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
Post.belongsTo(User, {
  foreignKey: 'user_id',
});

// Each user has many comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});
Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

// Each post has many comments
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
})

module.exports = { User, Post, Comment };