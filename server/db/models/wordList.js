const Sequelize = require('sequelize')
const db = require('../db')

const WordList = db.define('wordList', {
  word: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
})

module.exports = WordList

/**
 * instanceMethods
 */
