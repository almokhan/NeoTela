var express = require('express');
var router = express.Router();

// Carrega o arquivo index.handlebars
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NeoTela',favicon: '../public/favicon.png', });
});

module.exports = router;