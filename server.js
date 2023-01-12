const path = require('path')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const sequelize = require('./config/connection')

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}...`))
})
