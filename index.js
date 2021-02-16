const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000
//const makeid = require('./makeid')
var connections = []
var NextId = 1

//Routing
app.use(express.static('client'))


//Whenever someone connects this gets executed
io.on('connection', function(from, req) {
	console.log('A user connected');
	from.id = NextId++;
	connections.push(from)

	from.on('message', (msg) => {
        console.log(msg);
		from.send(msg)
    });

	//Whenever someone disconnects this piece of code executed
	from.on('disconnect', function () 
	{
		for(var i=0;i<connections.length;i++)
		{
			if(connections[i].id==from.id)
			{
				connections.splice(i,1)
			}
		}
	   console.log('A user disconnected');
	});
 });


 //Run server
 http.listen(port, function() {
	console.log('listening on *:3000');
 });
