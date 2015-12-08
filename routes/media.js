var express = require('express');
var Media   = require('../models/Media.js');
var router  = express.Router();

router.get('/:type', function(req, res, next) {
  var type = req.params.type;
  Media.findAll(type, function(err, data){
    console.log(err);
    if(err) { 
      res.send(err); 
    }
    else{ 
      // res.send(data);
      res.render('media/index', { 
        title: type.toUpperCase(),
        mediaData : data,
        type: type
      });
    }
  })
});

module.exports = router;
