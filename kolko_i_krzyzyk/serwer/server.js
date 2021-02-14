const http = require('http');
const websocket = require('ws');

const server = http.createServer((req, res) => {
    res.end("I am connected");
});
const io = new websocket.Server({ server });
const connections = []

//Event: 'connection'
io.on('connection', (from, req) => {
    from.send('This is a message from server, connection is established');
	connections.push(from);

    //receive the message from client on Event: 'message'
    from.on('message', (msg) => {
		sendAll(msg)
        //console.log(msg);
    });
});



server.listen(8080);

function sendAll(message)
{
	for(var i=0;i<connections.length;i++)
	{
		connections[i].send(message)
	}
}