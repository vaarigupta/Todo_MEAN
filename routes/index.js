var express = require('express');
var router =express.Router();

router.get('/',function(req,res,next){
    res.render('index'); // to render the file named index created in views folder 

})

module.exports = router;