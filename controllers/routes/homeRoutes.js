const router = require('express').Router()
const sequelize = require('../../config/connection')
const { User, Post, Comment } = require('../../models')

// home page
router.get('/', async (req, res) => {
  // load all posts into main page
  try {
    const dbPostsData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'user_name'],
          through: Comment,
          as: 'user_comments',
        },
        { model: Comment },
      ],
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
    res.render(error)
  }
})

// login/signup page
router.get('/login', async (req, res) => {
  res.render('login', {
    loggedIn: req.session.loggedIn,
    user_id: req.session.user_id,
  })
})

router.get('/sign-up', async (req, res) => {
  res.render('sign-up', {
    loggedIn: req.session.loggedIn,
    user_id: req.session.user_id,
  })
})

// dashboard
router.get('/dashboard', async (req, res) => {
  res.render('dashboard', {
    loggedIn: req.session.loggedIn,
    user_id: req.session.user_id,
  })
})

module.exports = router
