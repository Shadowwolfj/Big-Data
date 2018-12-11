// Initialize the socket variable while connecting to the server with
// the library that was imported in the index.html file.
var socket = io.connect();

// Declare the function that will be called as an event handler when the
// forward button on the page is clicked.
function forwardButton() {
	// Send a message to the server indicating that the button has been
	// clicked. The text of the message is simply the word "forward".
	socket.send('forward');
	
}
// Declare the function that will be called as an event handler when the
//   reverse button on the page is clicked.
function reverseButton() {
	// Send a message to the server indicating that the button has been
	// clicked. The text of the message is simply the word "backward".
	socket.send("backward");
	
}

// Declare the function that will be called as an event handler when the
//    Right button on the page is clicked.
function RightButton() {
	// Send a message to the server indicating that the button has been
	// clicked. The text of the message is simply the word "right".
	socket.send("right");
	
}


// Declare the function that will be called as an event handler when the
//    Left button on the page is clicked.
function LeftButton() {
	// Send a message to the server indicating that the button has been
	// clicked. The text of the message is simply the word "left".
	socket.send("left");
	
}

// Declare the function that will be called as an event handler when the
//    Stop button on the page is clicked.
function stop() {
	// Send a message to the server indicating that the button has been
	// clicked. The text of the message is simply the word "stop".
	socket.send("Stop");
	
}


function sendSpeed(value){
	// Send the value of the slider to the server. The number being sent
	// will automatically be converted to a string for transfer.
	socket.send(value);
	//A message sent to the console that the value has been sent 
	console.log('value sent');
		// Get the slider element that has the ID of "led" and change
		// the label to the current value.
	document.getElementById("status").innerHTML=value;
	
}


