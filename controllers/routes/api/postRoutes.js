const router = require('express').Router()
const sequelize = require('../../../config/connection')
const { User, Post, Comment } = require('../../../models')

// get all posts
router.get('/', async (req, res) => {
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

    res.status(200).json({ message: 'all posts', postsData })
  } catch (error) {
    res.status(500).json(error)
  }
})

// get one post
router.get('/:id', async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['id', 'user_name'] }],
    })

    const postData = dbPostData.get({ plain: true })

    res.status(200).json(postData)
  } catch (error) {
    res.status(500).json(error)
  }
})

// create a post
router.post('/', async (req, res) => {
  // body should look like this
  // {
  //   "title": "title"
  //   "text": "long text",
  //   "user_id": 5
  // }
  try {
    const newPost = await Post.create(req.body)

    res.status(201).json({ message: 'new post created', newPost })
  } catch (error) {
    res.status(500).json(error)
  }
})

// update a post
router.put('/:id', async (req, res) => {
  // body should look like this
  // {
  //   "title": "title"
  //   "text": "long text"
  // }
  try {
    const updatePost = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    })

    if (!updatePost) {
      res.status(404).json({ message: 'No post can be found with that id' })
    }

    res.status(200).json({ message: 'post has been updated!', updatePost })
  } catch (error) {
    res.status(500).json(error)
  }
})

// delete a post
router.delete('/:id', async (req, res) => {
  try {
    const deletePost = await Post.destroy({
      where: {
        id: req.params.id,
      },
    })

    if (!deletePost) {
      res.status(404).json({ message: 'No post can be found with that id' })
    }

    res.status(200).json({ message: 'post has been deleted', deletePost })
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
