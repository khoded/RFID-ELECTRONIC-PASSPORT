/*
Express.js Serial to Browser example
Shows how to serve static pages along with a dynamic route
which communicates with the serial port.
in Express.js 4.0

This has a RESTful interface.  The static index.html page
will continally request /device/3, which will return the value from the
serial port.

to start this:
node index.js portname

where portname is the name of your serial port

created 10 Feb 2015
modified 10 Jun 2015
by Tom Igoe
*/
var MongoClient = require('mongodb').MongoClient; //include mongodb
var express = require('express');				// include express.js
var app = express();								  	// a local instance of it

// serial port initialization:
var serialport = require('serialport');	// include the serialport library
var SerialPort  = serialport;					  // make a local instance of serial
var portName =  "/dev/ttyACM0";			  // get the port name from command line
var portConfig = {
	baudRate: 230400,
	// call myPort.on('data') when a newline is received:
	parser: new serialport.parsers.Readline('\n')
};

// open the serial port:
var myPort = new SerialPort(portName, portConfig);


//Connect to database
var url = "mongodb://localhost:27017/";


// get an analog reading from the serial port.
// This is a callback function for when the client requests /device/channel:
function getSensorReading(request, response) {
	// the parameter after /device/ is the channel number:
	var channel = request.params.channel;
	console.log("getting channel: "+ channel + "...");

	// send the channel number out the serial port
	//and wait for a response:
	myPort.write(channel, function(){
		// when you get a response from the serial port,
		//write it out to the client:
		myPort.on('data', function(data) {
			//convert the result to hexadecimal i.e to string
			 data = data.toString('utf8').match(/\w*/)[0]; // Only keep hex chars
				MongoClient.connect(url, function(err, db) {
				 if (err) throw err;
				 //connect db
				  var dbo = db.db("react_passport");
				  //assign data reading to filter the db
				   var query = { rfid: data };
				    dbo.collection("users").find(query).toArray(function(err, result) {
				    //if error i.e no result from the database
				     	if (err) throw err
				  // assign the result to data for passing to frontend
				  try {
				  	// statements
				  	data ="Nigerian Citizen "+result[0].name;
				  	response.end(data);
				  	console.log(result[0]);
				  } catch(e) {
				  	// statements
				  	//console.log(e);
				  	data = "Non Citizen: Fake Passport";
				  	response.end(data);
				  }
				    
				 // send the data and close the connection:
				   
				  db.close();
				});
			});
		});
	});
}


// start the server:
var server = app.listen(8070);
// start the listeners for GET requests:
app.use('/',express.static('public'));   // set a static file directory
app.use('/rfid.png', express.static(__dirname + '/rfid.png')); 
app.get('/device/:channel', getSensorReading);	// GET handler for /device


