var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('basic_01', { 
    title: 'Home',
    sayhi: 'HelloWorld !!'
  })
});
module.exports = router;