const router = require("express").Router();
const { Post } = require('../../models');
const auth = require("../../util/auth")

// create post
router.post('/', auth, async (req, res) => {
    console.log(req.body)
    newObj = {
        creator_id: req.session.userId,
        ...req.body
    }
    try {
        const newPost = await Post.create(newObj)
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// comment on post
router.put('/:id', auth, async ({ body, params }, res) => {
    console.log(body)

    try {
        const newPostComment = await Post.update(body, {
            where: {
                id: params.id
            }
        })
        res.status(200).json(newPostComment);
    } catch (err) {
        res.status(400).json(err);
    }
});


// delete post
router.delete('/:id', auth, async ({ params }, res) => {
    try {
        const deletePost = await Post.destroy({
            where: {
                id: params.id
            }
        });

        if (!deletePost) {
            res.status(404).json({ message: 'Cannot delete user loser' });
            return;
        }

        res.status(200).json(deletePost);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;