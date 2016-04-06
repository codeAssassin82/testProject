var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.get('/', function(req, res) {
  console.log('get it');
  console.log('req.body:',req.body);
  User.find({}, function(err, users) {
    console.log('user:',users);
    console.log('err', err);
    res.status(err ? 400 : 200).send(err || users);

  });
});


router.post('/register', function(req, res) {
  console.log("in user route file");
  User.register(req.body, function(err, user) {
    console.log("req.bodyReg", req.body);
    console.log("user",user);
    if(err) {
      res.status(400).send(err)
    }else {
      var token = user.generateToken();
      res.cookie('johnscookie', token).send(user);
      console.log('tokenPost', token);
    }
  });
});


router.post('/authenticate', function(req, res) {
  User.authenticate(req.body, function(err, user) {
    if(err) {
      res.status(400).send(err);
    } else {
      var token = user.generateToken();
      console.log('tokenAuth', token);
      res.cookie('johnscookie', token).send(user);
    }
  });
});

module.exports = router;
