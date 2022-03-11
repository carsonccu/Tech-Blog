const { Post } = require('../models')

const postdata = [
    {
        "post_title": "Favorite ski resort",
        "post_content": "I love Monarch for the small hometown feel",
        "user_id": 1
    },
    {
        "post_title": "Health",
        "post_content": "To stay healthy I mountain bike a lot",
        "user_id": 2
    },
    {
        "post_title": "Favorite dog",
        "post_content": "My favorite dog is a Colorado Mountain dog!",
        "user_id": 3
    }
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;