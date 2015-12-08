var express = require('express');
var User    = require('../models/User.js');
var router  = express.Router();
/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('user/register', { title: 'Register into Washido' });
});

router.get('/login', function(req, res, next) {
  res.render('user/login', { title: 'Login into Washido' });
});

router.post('/login', function(req, res, next) {
  var username = req.body.username;

  User.findInsert(username, function(err, data){
    if(!err)
      req.session.username = username;
    res.redirect('/');
  });

});

router.post('/addMedia', function(req, res, next) {
  var params = {
    "type": req.body.type,
    "id": req.body.id,
    "username": req.session.username
  };

  User.addMedia(params, function(err, data){
    if(err) res.send(err);
    else res.send(data);
  })
});




module.exports = router;
