var express = require('express');
var router  = express.Router();
var db   = require('../models/db');


/* View all in a <table> */
router.get('/all', function (req, res) {
    db.GetAllLevel(function (err, result) {
            if (err) throw err;
            res.render('displayLevelTable.ejs', {rs: result});
        }
    );
});


// Create User Form
router.get('/create', function(req, res){
    res.render('levelform.ejs', {action: '/level/create'});
});

// Save User to the Database
router.post('/create', function (req, res) {
    db.Insert( req.body, function (err, result) {
            if (err) throw err;

            if(result.l_level != 'undefined') {
                var placeHolderValues = {
		    l_desc: req.body.l_desc
                };
                res.render('displayLevelData.ejs', placeHolderValues);
            }
            else {
                res.send('WARNING: Level was not inserted successfully.');
            }
        }
    );
});

router.get('/', function (req, res) {
    console.log(req.query)
    db.Getl_level(req.query.l_level,
	function(err, result)
	{
	    if(err)
	    {
		throw err;
	    }
	    console.log(result);
	    res.render('displayLevelInfo.ejs', {rs: result});
			
	}
	);
    
});


/* sub corner */
router.get('/subCorner', function(req, res){
   db.GetPosition(function (err, result){
        if (err) throw err;
          res.render('subCorner.ejs', {rs: result});

   })
});

router.post('/subCorner', function (req, res) {
    db.GetSub( req.body, function (err, result) {
            if (err) {
                throw err;
            }
                res.render('viewSubShifts.ejs', {rs: result});
            }
    );
});


router.get('/level', function (req, res) {
    db.DisplayLevel(function (err, result) {
            if (err) {
                throw err;
            }
                res.render('DisplayLevel.ejs', {rs: result});
            }
    );
});




module.exports = router;

