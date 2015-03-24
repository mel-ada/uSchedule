var express = require('express');
var router  = express.Router();
var db   = require('../models/db');


/* View all in a <table> */
router.get('/all', function (req, res) {
    db.GetAllEmployee(function (err, result) {
            if (err) throw err;
            res.render('displayEmployeeTable.ejs', {rs: result});
        }
    );
});

/* View about page */
router.get('/about', function(req, res) {
    res.render('displayAboutPage.ejs', {action: '/employee/about'});
});

// Create Employee  Form
router.get('/create', function(req, res){
    res.render('employeeform.ejs', {action: '/employee/create'});
});

// Save Employee  to the Database
router.post('/create', function (req, res) {
    db.Insert( req.body, function (err, result) {
            if (err) throw err;

            if(result.affectedRows != 0 ) {
                var placeHolderValues = {
		    e_SSN: req.body.e_SSN,
		    e_FN: req.body.e_FN,
                    e_LN: req.body.e_LN,
                    e_level: req.body.e_level,
		    e_dName: req.body.e_dName
                };
                res.render('displayEmployeeData.ejs', placeHolderValues);
            }
            else {
                res.send('WARNING: Employee was not inserted successfully.');
            }
        }
    );
});

router.get('/', function (req, res) {
    console.log(req.query)
    db.Gete_SSN(req.query.e_SSN,
	function(err, result)
	{
	    if(err)
	    {
		throw err;
	    }
	    console.log(result);
	    res.render('displayEmployeeInfo.ejs', {rs: result});
	}
	);
    
});

module.exports = router;

