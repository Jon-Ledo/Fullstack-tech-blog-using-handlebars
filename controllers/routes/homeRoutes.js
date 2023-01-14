const router = require('express').Router()
const sequelize = require('../../config/connection')
const { User, Post, Comment } = require('../../models')

// home page
router.get('/', async (req, res) => {
  // load all posts into main page
  try {
    const dbPostsData = await Post.findAll({
      include: [{ model: User, attributes: ['id', 'user_name'] }],
    })

    const postsData = dbPostsData.map((data) => {
      return data.get({ plain: true })
    })

    res.render('home', {
      postsData,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
    })
  } catch (error) {
    res.render('error in loading')
  }
})

// login/signup page
router.get('/login', async (req, res) => {
  res.render('login')
})

// dashboard
router.get('/dashboard', async (req, res) => {
  res.render('dashboard', {
    loggedIn: req.session.loggedIn,
    user_id: req.session.user_id,
  })
})

module.exports = router
