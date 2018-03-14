'use strict';

var db = require('./database');
var Sequelize = require('sequelize');

// Make sure you have `postgres` running!

var User = require('./user');

//---------VVVV---------  your code below  ---------VVV----------

var Article = db.define('article', {
  title: {type: Sequelize.STRING, validate: {
    notEmpty: true
  }},
  content: {type: Sequelize.TEXT, allowNull: false},
  version: {type: Sequelize.INTEGER, defaultValue: 0},
  tags: {type: Sequelize.ARRAY(Sequelize.TEXT), defaultValue: []}
}, {
  getterMethods: {
    snippet() {
      return this.content ? this.content.slice(0, 23) + '...' : ''
    },
    tags() {
      return this.getDataValue('tags').join(', ').trim()
    }
  },
  // setterMethods: {
  //   tags(tagArray) {
  //     let tagString = tagArray.join(', ').trim()
  //     // console.log('TAGGSTTRING', tagString)
  //     // console.log('VALLLLLL', tagArray)
  //     // console.log('THHHIIISS', this)
  //     this.setDataValue('tags', tagString)
  //   }
  // },
  hooks: {
    beforeUpdate: (article) => {
      article.version++
    }
  }
});

Article.prototype.truncate = function(truncLength){
  this.content = this.content.slice(0, truncLength)
}

Article.findByTitle = function(titleToFind){
  return Article.findOne({
    where: {
      title: titleToFind
    }
  })
}

Article.belongsTo(User, {as: 'author'})

//---------^^^---------  your code above  ---------^^^----------

module.exports = Article;
