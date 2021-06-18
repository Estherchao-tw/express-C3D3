var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('dataDriven', { 
    title: 'Home',
    sayhi: 'HelloWorld !!'
  })
});
module.exports = router;