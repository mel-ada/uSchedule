var express = require('express');
var router  = express.Router();
var db   = require('../models/db');


/* View all  in a <table> */
router.get('/all', function (req, res) {
    db.GetAllStation(function (err, result) {
            if (err) throw err;
            res.render('displayStationTable.ejs', {rs: result});
        }
    );
});


// Create User Form
router.get('/create', function(req, res){
    res.render('stationform.ejs', {action: '/station/create'});
});

// Save User to the Database
router.post('/create', function (req, res) {
    db.Insert( req.body, function (err, result) {
            if (err) throw err;

            if(result.st_name != 'undefined') {
                var placeHolderValues = {
		    st_Desc: req.body.st_Desc,
                    st_dName: req.body.st_dName
                };
                res.render('displayStationData.ejs', placeHolderValues);
            }
            else {
                res.send('WARNING: Station was not inserted successfully.');
            }
        }
    );
});

router.get('/', function (req, res) {
    console.log(req.query)
    db.Getst_name(req.query.st_name,
	function(err, result)
	{
	    if(err)
	    {
		throw err;
	    }
	    console.log(result);
	    res.render('displayStationInfo.ejs', {rs: result});
			
	}
	);
    
});

module.exports = router;

