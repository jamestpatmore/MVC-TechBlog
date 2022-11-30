const router = require('express').Router();
const Comment = require('../../models/comment');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Comment.findAll()
    .then(commentData => res.json(commentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.post('/', withAuth, async (req, res) => {
    try {
        if (req.session) {
            const commentData = await Comment.create({
                comment_text: req.body.comment_text,
                blog_id: req.body.blog_id,
                user_id: req.session.user_id
            });
            res.status(200).json(commentData);
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(commentData);
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router; 