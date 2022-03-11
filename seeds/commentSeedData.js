const { Comment } = require('../models');

const commentdata = [
    {
        "comment_content": "Skiing is so much fun",
        "user_id": 2,
        "post_id": 1
    },
    {
        "comment_content": "I love Dogs",
        "user_id": 3,
        "post_id": 2
    },
    {
        "comment_content": "Mountain Biking is fun!",
        "user_id": 1,
        "post_id": 3
    }
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;