const router = require('express').Router();
const path = require('path');
const { User, Blog } = require('../models')
const withAuth = require('../utils/auth');

router.get('/profile', async (req, res) => {
    const userData = await User.findOne({
        where: {
            id: req.session.user_id
        },
        attributes: [
            'id', 'username'
        ],
        include: Blog
    });
    console.log(userData)

    const user = userData.get({ plain: true });

    console.log(user)
    res.render('profile', {
        layout: 'userprofile',
        user: user
    })
})

module.exports = router; 