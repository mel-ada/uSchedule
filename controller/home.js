var express = require('express');
var router = express.Router();
var db   = require('../models/db');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('home', { title: 'Express' });
});

// Return the text Hello, World!.
router.get('/hello', function(req, res){
    res.send('Hello, World!');
});

/* home file that links to various examples */
router.get('/', function(req, res){
    // use render instead of send, to replace the placeholders in home.ejs with the Key Value Pairs (KVP).
    res.render('home');
});

//Login
router.get('/login', function(req, res){
    res.render('login.ejs', {action: '/displayLoginData'});
});



router.get('/loginForm', function(req, res){
    res.render('loginForm.ejs', {action: '/displayLoginData'});
});


/* View all schedule in a <table> */
router.get('/allSchedule', function (req, res) {
    db.GetAllShift(function (err, result) {
            if (err) throw err;
            res.render('scheduleTable.ejs', {rs: result});
        }
    );
});

/* get sh_Day */
router.get('/', function (req, res) {
    console.log(req.query) 
    db.GetDay(req.query.sh_Day,
	function (err, result) {
            if (err) throw err;
	    console.log(result);
            res.render('scheduleTableInfo.ejs', {rs: result});
        }
    );
});









router.post('/displayLoginData', function(req, res) {
    console.log(req.body);
    res.render('displayLoginData.ejs', req.body );
});




// Employee Table 
router.get('/employeeForm', function(req, res){
    res.render('employeeform.ejs', {action: '/displayEmployeeData'});
});

router.post('/displayEmployeeData', function(req, res) {
    console.log(req.body);
    res.render('displayEmployeeData.ejs', req.body );
});


// Availability Table                                                                                                         
router.get('/enterAvailability', function(req, res){
    res.render('enterAvailability.ejs', {action: '/displayEmployeeData'});
});

router.post('/displayEmployeeData', function(req, res) {
    console.log(req.body);
    res.render('displayEmployeeData.ejs', req.body );
});


// Department Table
router.get('/DepartmentForm', function(req, res){
    res.render('departmentform.ejs', {action: '/displayDepartmentData'});
});

router.post('/displayDepartmentData', function(req, res) {
    console.log(req.body);
    res.render('displayDepartmentData.ejs', req.body );
});

// Shift 
router.get('/shiftForm', function(req, res){
    res.render('shiftform.ejs', {action: '/displayShiftData'});
});

router.post('/displayShiftData', function(req, res) {
    console.log(req.body);
    res.render('displayShiftData.ejs', req.body );
});

// Level
router.get('/levelForm', function(req, res){
    res.render('levelform.ejs', {action: '/displayLevelData'});
});

router.post('/displayLevelData', function(req, res) {
    console.log(req.body);
    res.render('displayLevelData.ejs', req.body );
});


// Station
router.get('/stationForm', function(req, res){
    res.render('stationform.ejs', {action: '/displayStationData'});
});

router.post('/displayStationData', function(req, res) {
    console.log(req.body);
    res.render('displayStationData.ejs', req.body );
});


// Employee Shift
router.get('/employeeshiftForm', function(req, res){
    res.render('employeeshiftform.ejs', {action: '/displayEmployeeShiftData'});
});

router.post('/displayEmployeeShiftData', function(req, res) {
    console.log(req.body);
    res.render('displayEmployeeShiftData.ejs', req.body );
});

module.exports = router;

