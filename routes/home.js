var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('home', { 
    title: 'Home',
    sayhi: 'HelloWorld !!'
  })
});
module.exports = router;