const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000

//Routing
app.use(express.static('client'))


//Whenever someone connects this gets executed
io.on('connection', function(socket) {
	console.log('A user connected');

	socket.on('message', (msg) => {

		var data = JSON.parse(msg)
		const resMsg = require('./responseMSG')

		switch(data.cmd)
		{
			case "join":
				resMsg.joinRoom(socket, io, data.room)
				break
			case "leave":
				resMsg.leaveRoom(socket, io, data.room)
				break
			case "ready":
				resMsg.ready(socket, io, data.room)
				break
			case "move":
				resMsg.move(socket, io, data.room, data.board)
				break
		}

        console.log(msg);
    });

	//Whenever someone disconnects this piece of code executed
	socket.on('disconnect', function () 
	{
		console.log('A user disconnected');
	});
 });

 io.games = []

 //Run server
 http.listen(port, function() {
	console.log('listening on *:3000');
 });
