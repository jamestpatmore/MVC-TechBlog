const router = require('express').Router();
const path = require('path');
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['username', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  
  if (req.session.logged_in) {
    res.redirect('/blog');
    return;
  }

  res.render('login', {
    layout: 'login'
  });
});


router.get('/signup', (req, res) => res.render('signup', {
  layout: 'login'
}));

router.get('/homepage', (req, res) => res.render('homepage'));

router.get('/contact', (req, res) => res.render('contact'));



router.get('/blogcreate', (req, res) => res.render('blogcreate', {
  logged_in: req.session.logged_in,
  layout: 'newblog'
}));



router.get('/blog/:id', async (req, res) => {
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

    res.render('blogpost', {
      ...blog,
      logged_in: req.session.logged_in,
      layout: 'singlepost'
    });
  } catch(err) {
    res.status(500).json(err);
  }
});

router.get('/blog', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      attributes: [
        'id',
        'title',
        'rating',
        'picture'
      ],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('blog', { 
      blogs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

/*router.post('/blogcreate', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});
*/

module.exports = router;


