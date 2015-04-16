var mysql   = require('mysql');


/* DATABASE CONFIGURATION */
var connection = mysql.createConnection({
    host: 'cwolf.cs.sonoma.edu',
    user: 'mmorel',
    password: '003611223'
});

var dbToUse = 'mmorel';

//use the database for any queries run
var useDatabaseQry = 'USE ' + dbToUse;

connection.query(useDatabaseQry, function (err) {
});


//Databse setup
connection.query('CREATE DATABASE IF NOT EXISTS mmorel', function (err) {
    if (err) throw err;
    connection.query('USE mmorel', function (err) {
        if (err) throw err;
        connection.query('CREATE TABLE IF NOT EXISTS users('
                         + 'id INT NOT NULL AUTO_INCREMENT,'
                         + 'PRIMARY KEY(id),'
                         + 'username VARCHAR(30),'
                         + 'password VARCHAR(30)'                                                                                                  
                         +  ')', function (err) {
                             if (err) throw err;
                         });
    });
});



//-------------------------------------------------------
// EMPLOYEE TABLE

// Display one employee (by entering SSN)
exports.Gete_SSN = function(employeeInfo, callback) {
    var query = 'Select e_username, e_FN, e_LN, e_level, e_dName from P2Employee WHERE e_SSN=' + landmarkInfo.e_SSN + ';';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
};


exports.getEmployeeLevels = function(callback) {
    var query = 'SELECT * from P2Level';
    connection.query(query, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            callback(null, result);
        }
    });
};

// Display all Employees
exports.GetAllEmployee = function(callback) {
    connection.query('SELECT e_username, e_FN, e_LN, e_level, e_dName from P2Employee',
	function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

// Insert an employee
exports.InsertEmployee = function(employeeInfo, callback) {
    console.log(employeeInfo);
    var query = 'INSERT INTO P2Employee (e_SSN, e_FN, e_LN, e_level, e_dName, e_username) VALUES (\'' 
	+ employeeInfo.e_SSN 
	+ '\', \'' 
	+ employeeInfo.e_FN 
	+ '\', \'' 
 	+ employeeInfo.e_LN
	+ '\', \'' 
	+ employeeInfo.levels
	+ '\', \''
	+ employeeInfo.department
	+ '\', \''
	+employeeInfo.e_username
	+ '\');';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );
}

//-----------------------------------------------------------------
//DEPARTMENT TABLE

exports.GetAllDepartment = function(callback) {
    connection.query('Select * FROM P2Department',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
};


exports.Insert = function(departmentInfo, callback) {
    console.log(departmentInfo);
    var query = 'INSERT INTO P2Department (d_name, d_location) VALUES (\'' 
	+ departmentInfo.d_name 
	+ '\', \'' 
	+ departmentInfo.d_location 
	+ '\');';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );
}

exports.Getd_name = function(d_name, callback) {
    var query = 'SELECT d_name, d_location FROM P2Department WHERE d_name =' + d_name;
    console.log(query);
    connection.query('SELECT d_name, d_location FROM P2Department WHERE d_name =' + d_name,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

//Select department from dropdown
exports.selectDept = function(callback) {
    var query = 'SELECT d_name FROM P2Department;';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

//Update changes in database 
exports.postDept = function(departmentInfo, callback) {
    var query = 'UPDATE P2Employee Set e_dName = \''+ departmentInfo.newdepartment +'\' WHERE e_SSN ='+ departmentInfo.rID +';';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}


//--------------------------------------------------------------------------
// SHIFT
exports.GetAllShift = function(callback) {
    connection.query('Select sh_idShift, sh_stnName, sh_Day, sh_StartTime, sh_EndTime, sh_taken, sh_level FROM P2Shift',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}


exports.GetDay = function(sh_Day, callback) {
    var query = 'SELECT sh_Day, sh_stnName, sh_StartTime, sh_EndTime from P2Shift WHERE sh_Day =' + sh_Day;
    console.log(query);
    connection.query('SELECT sh_Day, sh_stnName, sh_StartTime, sh_EndTime from P2Shift WHERE sh_Day =' + sh_Day,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}



exports.InsertShift = function(shiftInfo, callback) {
    console.log(shiftInfo);
    var query = 'INSERT INTO P2Shift (sh_idShift, sh_stnName, sh_Day, sh_StartTime, sh_EndTime, sh_taken, sh_level) VALUES (\'' 
	+ shiftInfo.sh_idShift 
	+ '\', \'' 
	+ shiftInfo.sh_stnName
	+ '\', \''
	+ shiftInfo.sh_Day
	+ '\', \''
	+ shiftInfo.sh_StartTime
	+ '\', \''
	+ shiftInfo.sh_EndTime
	+ '\', \''
	+ shiftInfo.sh_taken
	+ '\', \''
	+ shiftInfo.sh_level 
	+ '\');';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );
}

exports.Getsh_idShift = function(sh_idShift, callback) {
    var query = 'SELECT sh_idShift, sh_stnName, sh_Day, sh_StartTime, sh_EndTime, sh_taken, sh_level FROM P2Shift WHERE sh_idShift=' + sh_idShift;
    console.log(query);
    connection.query('SELECT sh_idShift, sh_stnName, sh_Day, sh_StartTime, sh_EndTIme, sh_taken, sh_Level FROM P2Shift WHERE sh_idShift =' + sh_idShift,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

//--------------------------------------------------------------------------------------
// AVAILABILITY

//Display enter availability page                                                                                         
exports.EnterAvailability = function(callback) {
    var query = 'SELECT a_Day, a_StartTime, a_EndTime from P2Availability;';


    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}




//Select availability for specific employee
//Copied from Employee Shift Schedule function, Not sure where userInfo.recNumber comes from                                                                               
exports.ViewAvailability = function(userInfo, callback) {
    var query = 'SELECT a_Day, a_StartTime, a_EndTime from P2Availability JOIN P2EmployeeAvailability ON P2Availability.a_ID = P2EmployeeAvailability.ea_ID JOIN P2Employee ON P2EmployeeAvailability.a_SSN = P2Employee.e_SSN WHERE P2Employee.e_SSN =' +
    userInfo.recNumber + ';';
    console.log(query);
    connection.query(query,
		     function (err, result) {
			 if(err) {
			     console.log(err);
			     callback(true);
			     return;
			 }
			 callback(false, result);
		     }
		    );
}






// -------------------------------------------------------------------------------------
// LEVEL

exports.GetAllLevel = function(callback) {
    connection.query('Select * FROM P2Level',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.Insert = function(levelInfo, callback) {
    console.log(levelInfo);
    var query = 'INSERT INTO P2Level (l_level, l_Desc) VALUES (\'' 
	+ levelInfo.l_level
	+ '\', \'' 
	+ levelInfo.l_Desc
	+ '\');';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );
}

exports.Getl_level = function(l_level, callback) {
    var query = 'SELECT * FROM P2Level WHERE l_level =' + l_level;
    console.log(query);
    connection.query('SELECT * FROM P2Level WHERE l_level =' + l_level,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}


//-------------------------------------------------------------------------
// STATION

exports.GetAllStation = function(callback) {
    connection.query('Select * FROM P2Station',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.Insert = function(stationInfo, callback) {
    console.log(stationInfo);
    var query = 'INSERT INTO P2Station (st_name, st_Desc, st_dName) VALUES (\'' 
	+ stationInfo.st_name
	+ '\', \'' 
	+ stationInfo.st_Desc
	+ '\', \''
	+ stationInfo.st_dName
	+ '\');';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );
}

exports.Getst_name = function(st_name, callback) {
    var query = 'SELECT * FROM P2Station WHERE st_name =' + st_name;
    console.log(query);
    connection.query('SELECT * FROM P2Station WHERE st_name =' + st_name,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}


//---------------------------------------------------------------------------
//EMPLOYEE SHIFT TABLE

//Display all entries in Employee Shift Table
//Warning: This will display a user's SSN.
exports.GetAllEmployeeShift = function(callback) {
    connection.query('Select * FROM P2EmployeeShift',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

// Insert an entry into Employee Shift Table
exports.Insert = function(employeeshiftInfo, callback) {
    console.log(employeeshiftInfo);
    var query = 'INSERT INTO P2EmployeeShift (es_SSN, es_idShift, es_dName, es_level) VALUES (\'' 
	+ employeeshiftInfo.es_SSN
	+ '\', \'' 
	+ employeeshiftInfo.es_idShift
	+ '\', \''
	+ employeeshiftInfo.es_dName
	+ '\', \''
	+ employeeshiftInfo.es_level
	+ '\');';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

// Display a specific entry
exports.Getes_SSN = function(es_SSN, callback) {
    var query = 'SELECT es_idShift, es_dName, es_level FROM P2EmployeeShift WHERE es_SSN =' + es_SSN;
    console.log(query);
    connection.query('SELECT es_idShift, es_dName, es_level FROM P2EmployeeShift WHERE es_SSN =' + es_SSN,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

//Select schedule for specific employee
exports.Schedule = function(userInfo, callback) {
    var query = 'SELECT sh_Day, sh_startTime, sh_endTime, sh_stnName from P2Shift JOIN P2EmployeeShift ON P2Shift.sh_idShift = P2EmployeeShift.es_idShift JOIN P2Employee ON P2EmployeeShift.es_SSN = P2Employee.e_SSN WHERE P2Employee.e_SSN =' + userInfo.recNumber + ';';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}






//Select the name of an employee based on their SSN (to make sure no ID's are visible to the user)
exports.EmployeeSSN = function(callback) {
    var query = 'SELECT e_SSN, e_FN, e_LN from P2Employee;';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );
}




/* SUBCORNER */
exports.GetSub = function(userInfo, callback) {
    var query = 'SELECT sh_Day, sh_startTime, sh_endTime, sh_stnName from P2Shift WHERE sh_taken = 0 AND sh_level =' +userInfo.level + ';';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}


//Select all positions for the drop down menu
exports.GetPosition = function(callback) {
    var query = 'SELECT l_Desc, l_level from P2Level;';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.DisplayLevel = function(callback) {
    var query = 'SELECT l_Desc, l_level from P2Level;';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}





