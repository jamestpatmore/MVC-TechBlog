const router = require('express').Router();
const  Blog = require('../../models/blog');
const User = require('../../models/user');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  console.log('Post request recieved');
  try {
    const newBlog = await Blog.create({
      title: req.body.title,
      picture: req.body.picture,
      rating: req.body.rating,
      user_id: req.session.user_id,
    });
    console.log(newBlog);
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    blogData = await Blog.findAll({
      attributes: [
        'id',
        'title',
        'picture',
        'rating'
      ],
      include: {
        model: User,
        attributes: ['username']
      }
    });
    console.log(blogData);
    res.status(200).json(blogData);
  } catch(err) {
    res.status(500).json(err);
  }
})

module.exports = router;