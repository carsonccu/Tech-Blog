// const router = require("express").Router();
// const { Post } = require('../../models');
// const auth = require("../../util/auth")

// // create post
// router.post('/', auth, async (req, res) => {
//     console.log(req.body)
//     newObj = {
//         creator_id: req.session.userId,
//         ...req.body
//     }
//     try {
//         const newPost = await Post.create(newObj)
//         res.status(200).json(newPost);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

// // comment on post
// router.put('/:id', auth, async ({ body, params }, res) => {
//     console.log(body)

//     try {
//         const newPostComment = await Post.update(body, {
//             where: {
//                 id: params.id
//             }
//         })
//         res.status(200).json(newPostComment);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });


// // delete post
// router.delete('/:id', auth, async ({ params }, res) => {
//     try {
//         const deletePost = await Post.destroy({
//             where: {
//                 id: params.id
//             }
//         });

//         if (!deletePost) {
//             res.status(404).json({ message: 'Cannot delete user loser' });
//             return;
//         }

//         res.status(200).json(deletePost);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// module.exports = router;

const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/:id', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect("/login");
        return;
    }

    try {

        const dbPostData = await Post.findByPk(req.params.id, {

        });

        const post = dbPostData.get({ plain: true });

        req.session.post_id = post.id;

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
router.put('/edit/:id', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect("/login");
        return;
    }
    try {
        console.log(req.body);
        console.log("What ID is this???",
            req.params.id)

        const dbPostData = await Post.update({
            post_title: req.body.post_title,
            post_content: req.body.post_content
        },
            {
                where: {
                    id: req.params.id
                }
            }
        );

        res.status(200).json(dbPostData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});



router.post('/comment', async (req, res) => {


    try {

        const newComment = await Comment.create({
            comment_content: req.body.comment_content,
            user_id: req.session.user_id,
            post_id: req.session.post_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

//updating a user's post

// router.put('/:id', async (req, res) => {
//   console.log("Test console 1");
//   try {
//     // console.log("Test console 2");
// // console.log(req.params.id)
//     const updatedComment = Comment.update(req.body, {
//       where: {
//         id: req.params.id,
//       },
//     })

router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;