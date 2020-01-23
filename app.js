
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors');
const helmet = require('helmet')

var port = process.env.PORT || 3400;

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())


require('./server/routes/jobExecution.route')(app);

// Listen on port 3400, IP defaults to 127.0.0.1
app.listen(port);

// Put a friendly message on the terminal
console.log('Server running at http://127.0.0.1:' + port + '/');
 
// needed for testing porpoises only
module.exports = app;


