var express = require('express');
var router  = express.Router();
var db   = require('../models/db');



//Update a specific employee's availability
router.get('/enterAvailability', function(req, res){
        db.EnterAvailability(function (err, result) {
            if (err) throw err;
	    
	    var formatTime = function(time) {
		if (time === 12){
                    return '12pm';
                }
		else if (time === 24){
                    return '12am';
                }
		else if (time > 12) {
		    return (time - 12) + 'pm';
		} 		 
		else  {
		    return time + 'am';
		}
	    };

	    db.GetAllEmployee(function (err, employees) { 
		if (err) throw err;
		res.render('enterAvailability.ejs', {rs: result, formatTime: formatTime, employees: employees});
	    });
	    
	});
});



//View changes made after updating an availability 
router.post('/enterAvailability', function (req, res) {
    //db.ViewAvailability( req.body, function (err, result) {
      //      if (err) {
        //        throw err;
               // res.render('viewAvailability.ejs', {rs: result});
	console.log(req.body);
    db.UpdateAvailability(req.body.employee, req.body.shifts, function(err){
//render availability for that person
});
 });
//});






//Select employee name                                                                                                  
router.get('/selectEmployeeName', function (req, res) {                                                                    
    db.EmployeeSSN( req.body, function (err, result) {                                                               
            if (err) {                                                                                                   
                throw err;                                                                                                
            }                                                                                                                             res.render('selectEmployeeName.ejs', {rs: result});                                                         
            }                                                                                                             
    );                                                                                                                    
});                                                                                                                       

//View specific employee's availability
router.post('/viewAvailability', function (req, res) {
    db.ViewAvailability( req.body, function (err, result) {
            if (err) {
                throw err;
            }
                res.render('viewAvailability.ejs', {rs: result});
            }
    );
});


module.exports = router;

