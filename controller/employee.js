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
router.get('/home', function(req, res) {
    res.render('home.ejs', {action: '/employee/home'});
});

// Create Employee  Form
router.get('/create', function(req, res){
    db.getEmployeeLevels(function(err, levels) {
        console.log(levels);
    	
	db.GetAllDepartment(function(err, department) {
	    console.log(department);
            res.render('employeeform.ejs', {action: '/employee/create', levels: levels, department: department});
    });
  });
});

// Save Employee  to the Database
router.post('/create', function (req, res) {
    db.InsertEmployee( req.body, function (err, result) {
            if (err) throw err;

            if(result.affectedRows != 0 ) {
                var placeHolderValues = {
		    e_SSN: req.body.e_SSN,
		    e_FN: req.body.e_FN,
                    e_LN: req.body.e_LN,
                    e_level: req.body.levels,
		    e_dName: req.body.department
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

