const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const db = {}

console.log('inside the index.js file')

const sequelize = new Sequelize({
  databsae: process.env.DB_NAME || 'db_name',
  username: process.env.DB_USER || 'username',
  password: process.env.DB_PASS || null,
  dialect: 'sqlite',
  options: {
    host: 'localhost',
    storage: './senior_project.sqlite'
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
})

fs
  .readdirSync(__dirname)
  .filter((file) =>
    file !== 'index.js'
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
