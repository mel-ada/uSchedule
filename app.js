// import libraries
var express = require('express'),
    ejs     = require('ejs'),
    connect = require('connect'),
    bodyParser = require('body-parser');

// import routes
var routes = require('./controller/home');
var employee  = require('./controller/employee');
var shift = require('./controller/shift');
var level = require('./controller/level');
var department = require('./controller/department');
var station = require('./controller/station');
var employeeshift = require('./controller/employeeshift');
var enterAvailability = require('./controller/availability');

// initialize express web application framework
// http://expressjs.com/
var app = express();

// these two lines replace bodyParser()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// configure static directory
app.use(express.static('public'));

//configure view rendering engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// subtitle values access via the header template
app.set('subtitle', 'Your Guide to Travel Destinations');

//configure routes
app.use('/', routes);
app.use('/employee', employee);
app.use('/shift', shift);
app.use('/level', level);
app.use('/department', department);
app.use('/station', station);
app.use('/employeeshift', employeeshift);
app.use('/enterAvailability', enterAvailability);

app.set('port', 2000);
app.listen(app.get('port'));
console.log("Express server listening on port", app.get('port'));
