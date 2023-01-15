const router = require('express').Router()
const sequelize = require('../../../config/connection')
const { User, Post, Comment } = require('../../../models')

// get all users data
router.get('/', async (req, res) => {
  try {
    const dbUsersData = await User.findAll({
      include: [{ model: Post }],
    })

    const usersData = dbUsersData.map((data) => {
      return data.get({ plain: true })
    })

    res.status(200).json({ message: 'All users', usersData })
  } catch (error) {
    res.status(500).json(error)
  }
})

// get one user
router.get('/:id', async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.params.id, {
      include: [{ model: Post }],
    })

    const userData = await dbUserData.get({ plain: true })

    res.status(200).json({ userData })
  } catch (error) {
    res.status(500).json(error)
  }
})

// create a user
router.post('/', async (req, res) => {
  //   {
  //     "user_name": "newUser",
  //     "password": "password"
  // }
  try {
    const newUser = await User.create(req.body)

    res.status(201).json({ message: 'new user created', newUser })
  } catch (error) {
    res.status(500).json(error)
  }
})

// update user by id
// not needed **
router.put('/:id', async (req, res) => {
  try {
    const updateUserData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    })

    if (!updateUserData) {
      res.status(404).json({ message: 'no user can be found with that id' })
    }

    res.status(200).json({ message: 'user updated!', updateUserData })
  } catch (error) {
    res.status(500).json(error)
  }
})

// delete user by id
router.delete('/:id', async (req, res) => {
  try {
    const deleteUser = await User.destroy({
      where: {
        id: req.params.id,
      },
    })

    if (!deleteUser) {
      res.status(404).json({ message: 'No user can be found with that id' })
    }

    res.status(200).json({ message: 'user deleted', deleteUser })
  } catch (error) {
    res.status(500).json(error)
  }
})

// login route
router.post('/login', async (req, res) => {
  // {
  //   "user_name": "username",
  //   "password": "password"
  // }
  try {
    // find the User who matches the username
    const userData = await User.findOne({
      where: { user_name: req.body.user_name },
    })

    // no match?
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' })
      return
    }

    // compare the password using function defined in the User model
    const validPassword = await userData.checkPassword(req.body.password)

    // no match?
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password, please try again' })
      return
    }

    req.session.save(() => {
      req.session.user_id = userData.id
      req.session.loggedIn = true

      res
        .status(200)
        .json({ user: userData, message: 'You are now logged in!' })
    })
  } catch (error) {
    res.status(500).json(error)
  }
})

// logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end()
    })
  } else {
    res.status(404).end()
  }
})

module.exports = router
