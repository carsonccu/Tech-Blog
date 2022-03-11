const router = require("express").Router();
const { User, Post, Comment } = require('../models');

// GET all posts
router.get("/", async (req, res) => {
    try {
        // Get all Posts and JOIN with User data
        const dbPostData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        // Serialize data so the template can read it -- else you get a mass of information that is overwhelming and difficult to work with
        const posts = dbPostData.map((post) => post.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render("all", {
            posts,
            username: req.session.username,
            user_id: req.session.user_id,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// -----------------------------------------------------------------

// Use withAuth middleware to prevent access to route <-- not suing this yet
router.get('/dashboard', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect("/login");
        return;
    }

    try {

        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id,
            {
                attributes: { exclude: ['password'] },
                include:
                    [{ model: Post }],
            });

        // console.log("THIS IS USERDATA:",
        // userData,
        // "==================================");

        const user = userData.get({ plain: true });

        // console.log("USERRRRRRRRRRRRRRRRRR",
        // user,
        // "=====================================")
        res.render('dashboard', {
            ...user,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// ------------------------------------------------------------
// Login route
router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    res.render("login");
});

// -----------------------------------------------------------------

// GET a single post
router.get("/:id", async (req, res) => {

    console.log("but do we get me back?");

    if (!req.session.loggedIn) {
        res.redirect("/login");
        return;
    }

    try {

        // console.log(req)
        const dbPostData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    attributes: ["comment_content", "createdAt"],
                    include: {
                        model: User,
                        attributes: ["username"],
                    },
                },
                { model: User, attributes: ["username"] },
            ],
        });

        // console.log(req.params.id);

        const post = dbPostData.get({ plain: true });

        // console.log("============",
        // post)

        req.session.post_id = post.id;

        console.log("I AM THE POST ID... I HOPE",
            req.session.post_id) // works

        // console.log(post)

        res.render("post", {
            post,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;