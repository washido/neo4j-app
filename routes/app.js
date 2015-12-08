var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('user/register', { title: 'Register into Washido' });
});

router.get('/login', function(req, res, next) {
  res.render('user/login', { title: 'Login into Washido' });
});

router.post('/login', function(req, res, next) {
  var username = req.body.username;
  res.send(req.body);
});




module.exports = router;
