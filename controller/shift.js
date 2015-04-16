var express = require('express');
var router  = express.Router();
var db   = require('../models/db');


/* View all  in a <table> */
router.get('/all', function (req, res) {
    db.GetAllShift(function (err, result) {
            if (err) throw err;
            res.render('displayShiftTable.ejs', {rs: result});
        }
    );
});


// Create User Form
router.get('/create', function(req, res){
    res.render('shiftform.ejs', {action: '/shift/create'});
});

// Save User to the Database
router.post('/create', function (req, res) {
    db.InsertShift( req.body, function (err, result) {
            if (err) throw err;

            if(result.sh_idShift != 'undefined') {
                var placeHolderValues = {
		    sh_stnName: req.body.sh_stnName,
                    sh_Day: req.body.sh_Day,
		    sh_StartTime: req.body.sh_StartTime,
                    sh_EndTime: req.body.sh_EndTime,
		    sh_taken: req.body.sh_taken,
		    sh_level: req.body.sh_level
                };
                res.render('displayShiftData.ejs', placeHolderValues);
            }
            else {
                res.send('WARNING: Shift was not inserted successfully.');
            }
        }
    );
});

router.get('/', function (req, res) {
    console.log(req.query)
    db.Getsh_idShift(req.query.sh_idShift,
	function(err, result)
	{
	    if(err)
	    {
		throw err;
	    }
	    console.log(result);
	    res.render('displayShiftInfo.ejs', {rs: result});
			
	}
	);
    
});

module.exports = router;

