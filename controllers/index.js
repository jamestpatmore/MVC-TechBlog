const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const profileRoutes = require('./profileRoutes');
//const blogRoutes = require('./blogRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/user', profileRoutes);
//router.use('/blog', blogRoutes);

module.exports = router;