const User = require('./user');
const Blog = require('./blog')
const Comment = require('./comment');
//const Comment = require('./comment');

User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Blog.belongsTo(User, {
    foreignKey: 'user_id'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    hooks:true
});

// Comment-Blog relationship
Comment.belongsTo(Blog, {
    foreignKey: 'blog_id',
    onDelete: 'cascade',
    hooks: true
});

// User-Comment relationsihp
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    hooks:true
});

// Blog-Comment relationship
Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: 'cascade',
    hooks:true
})


module.exports = { User, Blog, Comment };

