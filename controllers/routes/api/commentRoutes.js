const router = require('express').Router()
const sequelize = require('../../../config/connection')
const { User, Post, Comment } = require('../../../models')

// get all comments
router.get('/', async (req, res) => {
  try {
    const dbCommentsData = await Comment.findAll({
      include: [{ model: User, attributes: ['id', 'user_name'] }],
    })

    const commentsData = dbCommentsData.map((data) => {
      return data.get({ plain: true })
    })

    res.status(200).json({ message: 'all comment data', commentsData })
  } catch (error) {
    res.status(500).json(error)
  }
})
// get one comment
router.get('/:id', async (req, res) => {
  try {
    const dbCommentData = await Comment.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['id', 'user_name'] }],
    })

    const comment = dbCommentData.get({ plain: true })

    res.status(200).json(comment)
  } catch (error) {
    res.status(500).json(error)
  }
})

// create a comment
router.post('/', async (req, res) => {
  // {
  //   "text": "comment",
  //   "user_id": 5,
  //   "post_id": 1
  // }
  try {
    const newComment = await Comment.create(req.body)

    res.status(201).json({ message: 'new comment created', newComment })
  } catch (error) {
    res.status(500).json(error)
  }
})
// update comment
router.put('/:id', async (req, res) => {
  // {
  //   "text": "comment"
  // }
  try {
    const updateComment = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    })

    if (!updateComment) {
      res.status(404).json({ message: 'No comment can be found with that id' })
    }

    res.status(200).json({ message: 'comment updated!', updateComment })
  } catch (error) {
    res.status(500).json(error)
  }
})

// delete a comment
router.delete('/:id', async (req, res) => {
  try {
    const deleteComment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    })

    if (!deleteComment) {
      res.status(404).json({ message: 'No comment can be found with that id' })
    }

    res.status(200).json({ message: 'comment deleted', deleteComment })
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
