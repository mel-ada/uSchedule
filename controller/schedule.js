var express = require('express');
var router  = express.Router();
var db   = require('../models/db');







router.get('/weeklySchedule', function(req, res){
        db.weeklySchedule(function (err, result) {
           
            if (err) {                                                                                                                    
                throw err; 
	    }
	    
	    res.render('weeklyAvailability.ejs', {rs: result});
	    }
	);
});




router.post('/viewAvailability', function (req, res) {
    //db.ViewAvailability( req.body, function (err, result) {
      //      if (err) {
        //        throw err;
               // res.render('viewAvailability.ejs', {rs: result});
	console.log(req.body.e_SSN);  
 });
//});


/*
router.post('/viewAvailability', function (req, res) {
    db.ViewAvailability( req.body, function (err, result) {
            if (err) {
                throw err;
            }
                res.render('viewAvailability.ejs', {rs: result});
            }
    );
});
*/


module.exports = router;

