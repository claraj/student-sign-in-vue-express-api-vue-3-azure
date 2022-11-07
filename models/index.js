let {Sequelize, DataTypes } = require('sequelize')

let env = process.env.NODE_ENV || 'development'

console.log('Using environment ' + env)

let config = require(__dirname + '/../config.json')[env]

let password = process.env.DB_PASSWORD 
config.password = password 

let db = {}

let sequelize = new Sequelize(config)

let studentModel = require('./student')(sequelize, DataTypes)
db[studentModel.name] = studentModel

db.sequelize = sequelize  // sequelize object configured for our project
db.Sequelize = Sequelize  // sequelize libary

module.exports = db

