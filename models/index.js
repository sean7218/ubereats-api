var fs = require('fs')
var path = require('path')
var Sequelize = require('sequelize')
var basename = path.basename(__filename)
var config = require('../config/config.js')[process.env.NODE_ENV]
var db = {}

var dbConfig = {
  host: config.host,
  port: 3306,
  dialect: 'mysql',
  logging: () => { console.log(` Sequelize Host: ${config.host}`) }
}

console.log(`host: ${config.host} database connection established`)
var sequelize = new Sequelize(config.database, config.username, config.password, dbConfig)

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file))
    var modelName = capFirstLetter(model.name)
    console.log(modelName)
    db[modelName] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

/**
 * @description
 * the database table is plural and small letters such as `users`
 * the model used in the Sequelize should be singular and capitalized such as `User`
 */
function capFirstLetter (model) {
  let cap = model.charAt(0).toUpperCase() + model.slice(1)
  return cap.slice(0, -1)
}
module.exports = db
