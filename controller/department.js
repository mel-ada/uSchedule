var express = require('express');
var router  = express.Router();
var db   = require('../models/db');


/* View all in a <table> */
router.get('/all', function (req, res) {
    db.GetAllDepartment(function (err, result) {
            if (err) throw err;
            res.render('displayDepartmentTable.ejs', {rs: result});
        }
    );
});


// Create Department  Form
router.get('/create', function(req, res){
    res.render('departmentform.ejs', {action: '/department/create'});
});







// Save User to the Database
router.post('/create', function (req, res) {
    db.Insert( req.body, function (err, result) {
            if (err) throw err;
            if(result.d_name != 'undefined') {
                var placeHolderValues = {
                    d_location: req.body.d_location
                };
                res.render('displayDepartmentData.ejs', placeHolderValues);
            }
            else {
                res.send('WARNING: Department was not inserted successfully.');
            }
        }
    );
});

router.get('/', function (req, res) {
    console.log(req.query)
    db.Getd_Name(req.query.d_Name,
	function(err, result)
	{
	    if(err)
	    {
		throw err;
	    }
	    console.log(result);
	    res.render('displayDepartmentInfo.ejs', {rs: result});
			
	}
	);
    
});


router.get('/editDept', function (req, res) {
    db.selectDept(function (err, result) {
            if (err) throw err;

            if(result.affectedRows != 0 ) {
                var placeHolderValues = {
                    rID: req.body.rID,
                };
                res.render('displayDeptDropDown.ejs', {rs: result, placeholders: placeHolderValues});
            }
            else {
                res.send('Warning: An error has occured.');
            }
        }
    );
});

/*
router.post('/editDept', function (req, res) {
    db.selectDept(function (err, result) {
            if (err) throw err;

            if(result.affectedRows != 0 ) {
                var placeHolderValues = {
                    rID: req.body.rID,
                };
                res.render('displayDeptDropDown.ejs', {rs: result, placeholders: placeHolderValues});
            }
            else {
                res.send('Warning: An error has occured.');
            }
        }
    );
});




router.get('/postDept', function (req, res) {
    db.postDept(req.body, function (err, result) {
            if (err) throw err;

            if(result.affectedRows != 0 ) {
                var placeHolderValues = {
                    newdepartment: req.body.newdepartment,
                };
                res.render('departmentEditSuccessful.ejs', {rs: result, placeholders: placeHolderValues});
            }
            else {
                res.send('User was not inserted.');
            }
        }
    );
});
*/

router.post('/postDept', function (req, res) {
    db.postDept(req.body, function (err, result) {
            if (err) throw err;

            if(result.affectedRows != 0 ) {
               var placeHolderValues = {
                    newdepartment: req.body.newdepartment,

                };
                res.render('departmentEditSuccessful.ejs', {rs: result, placeholders: placeHolderValues});
            }
            else {
                res.send('WARNING:  An error has occured.');
            }
        }
    );
});


module.exports = router;

