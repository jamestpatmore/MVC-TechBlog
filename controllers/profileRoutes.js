const router = require('express').Router();
const path = require('path');
const { User, Blog, Comment} = require('../models')
const withAuth = require('../utils/auth');

router.get('/profile', async (req, res) => {
    const userData = await User.findOne({
        where: {
            id: req.session.user_id
        },
        attributes: [
            'id', 'username'
        ],
        include: {
            model: Blog,
            attributes: ['id', 'picture', 'rating', 'title']
        }
    });
    console.log(userData)

    const user = userData.get({ plain: true });

    console.log(user)
    res.render('profile', {
        layout: 'userprofile',
        user: user
    })
});

router.get('/profile/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findOne({
          where: {
            id: req.params.id,
          },
          include: [
            {
            model: User,
            attributes: ['username']
            },
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'blog_id', 'user_id'],
              include: {
                model: User,
                attributes: ['username']
              }
            }
          ]
        });
        console.log(blogData);
        const blog = blogData.get({ plain: true });
    
        res.render('profile-blogs', {
          ...blog,
          logged_in: req.session.logged_in,
          profile: true,
          layout: 'singlepost'
        });
      } catch(err) {
        res.status(500).json(err);
      }
})

module.exports = router; 