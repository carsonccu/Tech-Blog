const router = require("express").Router();
const { User, Post, Comment } = require('../models');

// GET all posts
router.get("/", async (req, res) => {
    try {

        const dbPostData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        const posts = dbPostData.map((post) => post.get({ plain: true }));
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


router.get('/dashboard', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect("/login");
        return;
    }

    try {

        const userData = await User.findByPk(req.session.user_id,
            {
                attributes: { exclude: ['password'] },
                include:
                    [{ model: Post }],
            });



        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    res.render("login");
});


router.get("/:id", async (req, res) => {

    console.log("id");

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



        const post = dbPostData.get({ plain: true });



        req.session.post_id = post.id;

        console.log("I AM THE POST ID",
            req.session.post_id)



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