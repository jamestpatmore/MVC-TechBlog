const router = require('express').Router();
const path = require('path');
const { User, Blog } = require('../models');
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
    res.redirect('/');
    return;
  }

  res.render('login', {
    layout: 'login'
  });
});

router.get('/test', (req, res) => res.render('test'))


router.get('/blogcheck', (req, res) => res.render('blogcheck', {
  layout: 'login'
}));


router.get('/signup', (req, res) => res.render('signup', {
  layout: 'login'
}));

router.get('/homepage', (req, res) => res.render('homepage'));

router.get('/contact', (req, res) => res.render('contact'));

router.get('/shop', (req, res) => res.render('shop'));

router.get('/blogcreate', (req, res) => res.render('blogcreate', {
  logged_in: req.session.logged_in,
  layout: 'newblog'
}));

router.get('/community', (req, res) => res.render('community', {
  logged_in: req.session.logged_in,
  layout: 'commune'
}));

router.get('/pc', (req, res) => res.render('pc', {
  logged_in: req.session.logged_in,
  layout: 'category'
}));

router.get('/keyboard', (req, res) => res.render('keyboard', {
  logged_in: req.session.logged_in,
  layout: 'category'
}));

router.get('/chairs', (req, res) => res.render('chairs', {
  logged_in: req.session.logged_in,
  layout: 'category'
}));

router.get('/accesories', (req, res) => res.render('accesories', {
  logged_in: req.session.logged_in,
  layout: 'category'
}));

router.get('/product/:id', async (req, res) => {
  try {
    const productData = await Product.findOne({
      where: {
        id: req.params.id,
      }
    });
    console.log(productData);
    const product = productData.get({ plain: true });

    res.render('product', {
      ...product,
      //spreading the contents of product based off of the id from the seeded data etc...
      logged_in: req.session.logged_in,
      layout: 'secondary'
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: User,
        attributes: ['username']
      }
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


