const sequelize = require('../config/connection')
const User = require('../models/user')
const Post = require('../models/post')
const Comment = require('../models/comment')
const userSeedData = require('./user-seeds.json')
const postSeedData = require('./post-seeds.json')
const commentSeedData = require('./comment-seeds.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true })

  const users = await User.bulkCreate(userSeedData, {
    individualHooks: true,
    returning: true,
  })

  const posts = await Post.bulkCreate(postSeedData, {
    individualHooks: true,
    returning: true,
  })

  const comments = await Comment.bulkCreate(commentSeedData, {
    individualHooks: true,
    returning: true,
  })

  process.exit(0)
}

seedDatabase()
