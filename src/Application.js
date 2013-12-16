import device;
import ui.TextView as TextView;
import event.Emitter as Emitter;
import ui.TextEditView as TextEditView;
import ui.widget.ButtonView as ButtonView;

exports = Class(GC.Application, function () {

	this.initUI = function () {

		var spacing = 45;
		var yPos = 0;

		var textview = new TextView({
			y: 0,
			height: 30,
			superview: this.view,
			layout: "box",
			text: "Sockets test",
			color: "white"
		});


		yPos = yPos + 30;
/*

		var buttonview = new ButtonView({
		  superview: this.view,
		  width: 200,
		  height: 75,
		  x: 0,
		  y: yPos,
		  color: "red",
		  images: {
		    down: "resources/images/blue1.png",
		    up: "resources/images/blue2.png"
		  },
		  on: {
		    down: function () {
		     	emitter.emit('connect');
		       console.log("This function is called when the button transitions to down!");
		    },
		    up: function () {
		      console.log("This function is called when the button transitions to up!");
		    }
		  }
		});
*/

		yPos = yPos + 65 + spacing;


		var viewSendLabel = new TextView({
			y: yPos,
			height: 30,
			width: 45,
			superview: this.view,
			autoFontSize: false,
			size: 14,
			layout: "box",
			text: "Send",
			color: "white"
		});

	    var viewSendText = new TextEditView({
			superview: this.view,
			layout: "box",
			text: "Text sent to play",
			color: "#000000",
			backgroundColor: "#E0E0E0",
			horizontalAlign: "left",
			padding: 10,
			wrap: true,
			autoSize: false,
			autoFontSize: false,
			verticalAlign: "top",
			x: 50,
			y: yPos,
			width: 280,
			height: 75,
			size: 16,
			fontFamily: "Arial Black",
			clip: true
	    });

	    yPos = yPos + 50 + spacing;
		var viewReceiveLabel = new TextView({
			y: yPos,
			height: 30,
			width: 45,
			superview: this.view,
			autoFontSize: false,
			size: 14,
			layout: "box",
			text: "Receive",
			color: "white"
		});

	    var viewReceiveText = new TextView({
			superview: this.view,
			layout: "box",
			text: "",
			color: "#000000",
			backgroundColor: "#E0E0E0",
			horizontalAlign: "left",
			padding: 10,
			wrap: true,
			autoSize: false,
			autoFontSize: false,
			verticalAlign: "top",
			x: 50,
			y: yPos,
			width: 280,
			height: 75,
			size: 16,
			fontFamily: "Arial Black",
			clip: true
	    });


		var emitter = new Emitter();

		emitter.on("connect", function (event) {

			console.log("Starting socket test");
			var wsUri = "ws://radiant-wildwood-6278.herokuapp.com/pingWs"; 
			var output; 

			testWebSocket();

			function init() { 
				//output = document.getElementById("output");
				 testWebSocket(); 
			}



			function testWebSocket() { 
				console.log ("Function test Websocket called");

				websocket = new WebSocket(wsUri); 

				websocket.onopen = function(evt) { 
					console.log ("websocket.onopen");
					onOpen(evt) 
				}; 

				websocket.onclose = function(evt) { 
					console.log ("websocket.onclose");
					onClose(evt) 
				}; 

				websocket.onmessage = function(evt) { 
					console.log ("websocket.onmessage");
					onMessage(evt) 
				}; 

				websocket.onerror = function(evt) { 
					console.log ("websocket.onerror");
					onError(evt) 
				}; 
			}

			function onOpen(evt) { 
				console.log("CONNECTED"); 
				doSend(viewSendText.getText()); 

			}

			function onClose(evt) { 
				console.log("DISCONNECTED"); 
			}

			function onMessage(evt) { 
				console.log('RESPONSE: ' + evt.data); 
				viewReceiveText.setText(evt.data);
				websocket.close(); 
			}

			function onError(evt) { 
				console.log('<span style="color: red;">ERROR:</span> ' + evt.data); 
			}

			function doSend(message) { 
				console.log("SENT: " + message);  websocket.send(message); 
			}
			console.log("End web sockets");
		});

		emitter.emit('connect');

	};
	
	this.launchUI = function () {};

});
