const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
//const fs = require('fs')
const port = process.env.PORT || 3000
var connections = []
function makeid(length) {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
	   result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
 }


app.get('/', function(req, res) {
	res.sendfile('index.html');
 });
 

//Whenever someone connects this gets executed
io.on('connection', function(from, req) {
	console.log('A user connected');
	from.id=makeid(5)
	connections.push(from)

	from.on('message', (msg) => {
        console.log(msg);
		sendToAll(msg)
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

 http.listen(port, function() {
	console.log('listening on *:3000');
 });

 function sendToAll(msg)
 {
	 console.log("Rozsyłka")
	 for(var i=0;i<connections.length;i++)
	 {
		 if(connections[i]!=null)
		 {
			 connections[i].send(msg)
		 }
	 }
 }