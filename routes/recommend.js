var express = require('express');
var Media   = require('../models/Media.js');
var router  = express.Router();

router.get('/:type', function(req, res, next) {
  var type = req.params.type;
  var username = req.session.username;
  Media.recommend(username, type, function(err, data){
    if(err) { 
      res.send(err); 
    }
    else{ 
      res.render('media/index', { 
        title: type.toUpperCase() + 'S RECOMMENDED FOR YOU',
        mediaData : data,
        type: type
      });
    }
  })
});

module.exports = router;
