var express = require('express');
var router = express.Router();

// Carrega o arquivo index.handlebars
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Neo | Index' });
});

module.exports = router;