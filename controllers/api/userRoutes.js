const router = require('express').Router();
const User = require('../../models/user');

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        console.log(userData)
        if (!userData) {
            res.status(400)
            .json({ message: 'Incorrect username or password, try again'});
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);
        console.log(validPassword);
        if(!validPassword) {
            res.status(400)
            .json({ message: 'Incorrect username or password, try again'});
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in'});
        })
    } catch(err) {
        res.status(400).json(err)
    }
});

router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password
        });
        
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;

            req.json(userData);
        })
    }catch(err) {
        res.status(500).json(err)
    }
})

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
})

//home shop comm blog contact signup

module.exports = router;