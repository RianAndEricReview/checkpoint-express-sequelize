var express = require('express');
var router = express.Router();

var Article = require('../models/article');

/**
 *
 *___ _____ _   ___ _____   _  _ ___ ___ ___
 / __|_   _/_\ | _ \_   _| | || | __| _ \ __|
 \__ \ | |/ _ \|   / | |   | __ | _||   / _|
 |___/ |_/_/ \_\_|_\ |_|   |_||_|___|_|_\___|
 *
 *
 */
router.get('/articles', (req, res, next) => {
  Article.findAll()
  .then(articles => {
    res.json(articles)
  })
  .catch(next)
})

router.get('/articles/:id', (req, res, next) => {
  Article.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(article => {
    if (!article){
      res.sendStatus(404)
    } else {
      res.json(article)
    }
  })
  .catch(next)
})

module.exports = router;
