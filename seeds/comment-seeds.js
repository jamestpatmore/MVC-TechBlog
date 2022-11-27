const Comment = require('../models/comment');

const commentData = [{
        comment_text: "Lorem ipsum dolor sit amet",
        user_id: 1,
        blog_id: 1
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;