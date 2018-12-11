
// Initialize the Express.js object. Used to create a server.
var express = require('express');	
// Initialize the app object from the Express object. This is the 
// part that runs all of the server services.  
var app = express();
// Create the server object. This is the object that serves up the 
// HTML pages to the client.
var server = require('http').createServer(app);
// Create the socket.io instance and have it listen on the server.
// This establishes a two way connection between the server and 
// any clients that connect to the server.
var io = require('socket.io').listen(server);
// Import and initialize the Johnny-Five object that will communicate
// with the arduino board.
var five = require("johnny-five");
// Initialize and establish a connection to the Arduino board. No
// arguments are needed when connecting to an Arduino Uno board.
var board = new five.Board();

// Declare as a global variable the motorRight variable. When the board is
// initialized, the  Johnny-Five Motor object will be assigned to the
// motorRight variable
var motorRight;
// Declare as a global variable the motorLeft variable. When the board is
// initialized, the  Johnny-Five Motor object will be assigned to the
// motorLeft variable
var motorLeft;
// Declare as a global variable the motorSpeed variable. This variable will
// hold the  value given by the client.
var motorSpeed;
// Declare as a global variable the motorDirection variable. This variable
// will hold the current direction commanded by the client and use it in a logic function  
var motorDirection="forward";
// Declare as a global variable the iosocket variable. This variable 
// will be initialized to the socket object that is returned when a 
// connection is made with a client. It is a global variable so it can
// be accessed in different scopes within this program.
var iosocket;
// Declare as a global variable the motorLogic variable. This variable
// will hold a truth value which is determined by the state of the motor.
var motorLogic;
// Start the server listening on port 80. This is the port that
// the HTTP requests will come in on.
server.listen(80);  
// Specify which directory will be used for static content on the
// server.
app.use(express.static('public')); 
// Define the event handler that will be triggered when the board is
// ready and properly initialized.
board.on("ready", function() {
// Create a new motor object from the five object. The selected pin
// is 11, a pin that is capable of PWM control, and 2 which
// always remains at low. Assign the new  motor object to the motorRight 
//variable that was initialized above.
    motorRight = new five.Motor({
		pins: {
			pwm: 11,
			dir: 12
		},
		invertPWM: true
		});
// Create a new motor object from the five object. The selected pin
// is 10, a pin that is capable of PWM control, and 4 which
// is a directional pin. Assign the new  motor object to the motorLeft 
//variable that was initialized above.
    motorLeft = new five.Motor({
		pins: {
			pwm: 10,
			dir: 8	
		},
		
		invertPWM: true
		});
	// Let the user know that the motors has been initialized. Output is
    // to the console on the server.
    console.log("Motors Initialized.");
});

// Define the event handler that will be triggered when the socket.io
// connection is made. The callback function is anonymous and takes 
// a socket object that can be used in the function.
io.sockets.on('connection', function (socket) { 
	// Notify the user through the server's console that the Socket.io
	// connection has been established with a client.
	console.log("Socket IO Initialized.");
	
	// Make the socket object visible to the rest of the program by 
	// copying it into the global variable that was declared above.
	iosocket = socket;
	// Define the event handler that will be triggered when a message 
	// comes in over the Socket.io connection. It is a "message" event
	// and the callback function receives a data object that contains 
	// the message from the client.
    socket.on('message', function (data) { 
		// If the data received from the client is the word forward, then
		//initiate the left and right motor functions and set motorDirection 
		// to forward.
		
		switch(data){
			
			case 'forward':
						   //run right motor at the value held by motorSpeed
						   motorRight.forward(motorSpeed);
						   //run the left motor at the value held by motorSpeed 
						   motorLeft.forward(motorSpeed);
						   // set the value of motorDirection to forward
						   motorDirection="forward";
						   // Notify the user through the server's console that the motors
						   // are indeed going forward.
						   console.log('Going Forward');
						   // set motorLogic to true
						   motorLogic= true;
						   break;
						   
						  
			case 'backward': 
							//run right motor at the value held by motorSpeed
							motorRight.reverse(motorSpeed);
							//run the left motor at the value held by motorSpeed 
							motorLeft.reverse(motorSpeed);
							// set the value of motorDirection to reverse
							motorDirection="reverse";
							// Notify the user through the server's console that the motors
							// are indeed going backwards.
							console.log('Going Backwards');
							// set motorLogic to true
							motorLogic=true;
						    break;
			
		
			case 'Stop' :
							//stop the right motor 
							motorRight.stop();
							//stop the left motor 
							motorLeft.stop();
							// Notify the user through the server's console that the motors
							// are indeed going backwards.
							console.log('Stop');
							// set motorLogic to false
							motorLogic=false;
							break;
			 
			
			case 'right':  
							//run right motor at the value held by motorSpeed
						    motorRight.forward(motorSpeed);
						    //run the left motor at the value 0 
						    motorLeft.forward(0);
						    // Notify the user through the server's console that the robot   
							// are indeed going  right.
						    console.log('right');	
						    motorDirection="right";
						    // set motorLogic to true
						    motorLogic=true;
						    break;
			
			case 'left':
							//run the right motor at the value 0 
							motorRight.forward(0);
							//run the left motor at the value held at motorSpeed
							motorLeft.forward(motorSpeed);
							 // Notify the user through the server's console that the robot  
							// are indeed going  left.
							console.log('left');
							motorDirection="left";
							// set motorLogic to true
							motorLogic=true;
							break;
			default:			   
							// Set motorSpeed equal to data which is inverted into a number
							motorSpeed = Number(data);
							// Notify the user through the server's console that the speed
							// has changed.
							console.log('Speed change');
							// if motorDirection is forward and motorLogic is true
							// the fun the following event handler 
							if(motorDirection=='forward' && motorLogic ){
								// an event handler whose parameters hold a delay function
								// this is crucial so that the program will not freeze upon a rapid 
								//number of inputs
								board.wait(20,function(){
									// shift the current speed of the forward moving 
									// motors to the new given speed 
									motorRight.forward(motorSpeed);
									motorLeft.forward(motorSpeed);
								});
							}
							 	// if motorDirection is left and motorLogic is true
							    // the fun the following event handler 
								else if(motorDirection=='left' && motorLogic ){
								// an event handler whose parameters hold a delay function
								// this is crucial so that the program will not freeze upon a rapid 
								//number of inputs
								board.wait(20,function(){
									// shift the current speed of the forward moving 
									// motors to the new given speed 
									motorRight.forward(0);
									motorLeft.forward(motorSpeed);
									console.log('left shift');
								});
							}	
								// if motorDirection is right and motorLogic is true
								// the fun the following event handler 
								else if(motorDirection=='right' && motorLogic ){
								// an event handler whose parameters hold a delay function
								// this is crucial so that the program will not freeze upon a rapid 
								//number of inputs
								board.wait(20,function(){
									// shift the current speed of the forward moving 
									// motors to the new given speed 
									motorRight.forward(motorSpeed);
									motorLeft.forward(0);
								});
							}
								// if motorDirection is reverse and motorLogic is true
								// the fun the following event handler 
								else if (motorDirection=='reverse' && motorLogic){
								// an event handler whose parameters hold a delay function
								// this is crucial so that the program will not freeze upon a rapid 
								//number of inputs
								board.wait(20,function(){
									// shift the current speed of the backward moving 
									// motors to the new given speed 
									motorRight.reverse(motorSpeed);
									motorLeft.reverse(motorSpeed);
								});
							}
		}
        // Notify the user through the server's console that the   
		// code worked and they did a great job.
       console.log('If you made it here...it all Worked!! YAY');
    });
});
