'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user');


router.get('/', function(req, res) {
  res.render('index');
});

router.use(User.authMiddleware);

router.get('/protected', function(req, res) {
  console.log('req.user:', req.user);
  res.send('wooo! protected!!');
});

module.exports = router;
