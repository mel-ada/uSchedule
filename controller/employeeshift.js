var express = require('express');
var router  = express.Router();
var db   = require('../models/db');


/* View all in a <table> */
router.get('/all', function (req, res) {
    db.GetAllEmployeeShift(function (err, result) {
            if (err) throw err;
            res.render('displayEmployeeShiftTable.ejs', {rs: result});
        }
    );
});

// Create User Form
router.get('/create', function(req, res){
    res.render('employeeshiftform.ejs', {action: '/employeeshift/create'});
});

// Save User to the Database
router.post('/create', function (req, res) {
    db.Insert( req.body, function (err, result) {
            if (err) throw err;

            if(result.es_SSN != 'undefined') {
                var placeHolderValues = {
		    es_idShift: req.body.es_idShift,
                    es_dName: req.body.es_dName,
                    es_level: req.body.es_level
                };
                res.render('displayEmployeeShiftData.ejs', placeHolderValues);
            }
            else {
                res.send('WARNING:  Employee shift was not inserted successfully.');
            }
        }
    );
});

router.get('/', function (req, res) {
    console.log(req.query)
    db.Getes_SSN(req.query.es_SSN,
	function(err, result)
	{
	    if(err)
	    {
		throw err;
	    }
	    console.log(result);
	    res.render('displayEmployeeShiftInfo.ejs', {rs: result});
			
	}
	);
    
});


router.get('/viewSchedule', function(req, res){
        db.EmployeeSSN(function (err, result) {
            if (err) throw err;
        res.render('viewSchedule.ejs', {rs: result});
    }
    );
});

router.post('/viewSchedule', function (req, res) {
    db.Schedule( req.body, function (err, result) {
            if (err) {
                throw err;
            }
                res.render('employeeSchedule.ejs', {rs: result});
            }
    );
});

router.get('/createSchedule', function(req, res){
        db.CreateSchedule(function (err, result) {
            if (err) throw err;
        res.render('createschedule.ejs', {rs: result});
    }
    );
});

router.post('/createSchedule', function (req, res) {
    db.Schedule( req.body, function (err, result) {
            if (err) {
                throw err;
            }
                res.render('createschedule.ejs', {rs: result});
            }
    );
});
module.exports = router;

