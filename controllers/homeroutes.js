const router = require("express").Router();
const { User, Post, Comment } = require('../models');

// router.get("/", (req, res) => {
//     res.render("login")
// });

router.get("/login", (req, res) => {
    res.render("login")
});



// route to get all post and render to "all" view
router.get('/dashboard', async (req, res) => {
    // We find all posts in the db and set the data equal to postData
    const postData = await Post.findAll().catch((err) => {
        res.json(err);
    });
    // We use map() to iterate over postData and then add .get({ plain: true }) each object to serialize it. 
    const posts = postData.map((post) => post.get({ plain: true }));
    // We render the template, 'all', passing in posts, a new array of serialized objects.
    res.render('dashboard', { posts });
});


// Posts
// route to get all Post from a user using params
router.get('/:id', async (req, res) => {
    try {
        // We find all post assocaited with this user from params using the param to search by username
        const postData = await Post.findByPk(req.params.id)
        // if this user !exist than display error and return
        if (!postData) {
            res.status(404).json({ message: 'No user with this username!' });
            return;
        }
        // This returns a sequlize post object back and assigned it to post constant 
        const post = postData.get({ plain: true });
        // We render the template, 'post', passing in post, a new array of serialized objects.
        // need to relook at this code (render code for sure bucko)
        res.render('post', post);
    }
    catch (err) {
        res.status(500).json(err);
    };

});

module.exports = router;