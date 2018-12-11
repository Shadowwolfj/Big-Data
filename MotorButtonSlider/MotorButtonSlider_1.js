
var express = require('express');	
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var five = require("johnny-five");

var board = new five.Board();
var motorRight;
var motorLeft;
var motorSpeed;
var iosocket;

server.listen(8080); 
app.use(express.static('public')); 

board.on("ready", function() {
    motorRight = new five.Motor([11, 2]);
    motorLeft  = new five.Motor([10,4]);
	   
    console.log("Motors Initialized.");
});

io.sockets.on('connection', function (socket) { 
	console.log("Socket IO Initialized.");
	
	iosocket = socket;
	
    socket.on('message', function (data) { 
       if (data=='forward') {
		   motorRight.forward(motorSpeed);
		   motorLeft.forward(motorSpeed);
		   console.log('Going Forward');
		} else if (data == 'backward' ){
			motorRight.reverse(motorSpeed);
			motorLeft.reverse(motorSpeed);
			console.log('Going Backwards');
		} else if (data == 'Stop') {
			motorRight.stop();
			motorLeft.stop();
			console.log('Stop');
		} else {
			motorSpeed = Number(data);
			console.log('Speed change');
		}
       
       console.log('Button Event Handled');
    });
});
