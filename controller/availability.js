var express = require('express');
var router  = express.Router();
var db   = require('../models/db');






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






router.get('/enterAvailability', function(req, res){
        db.EnterAvailability(function (err, result) {
            if (err) throw err;
        res.render('enterAvailability.ejs', {rs: result});
    }
    );
});


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

