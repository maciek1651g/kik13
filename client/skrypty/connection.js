var socket = io();

socket.on('connect', (message) => {
	console.log("Connected")
	document.getElementById("connect").innerHTML = "<p>Connection: open</p>"
})

socket.on('disconnect', (reason) => {
	console.log("Disconnected")
	socket.close()
});

socket.on('connect_error', (err) => {
	console.log("Error: "+err.message)
	document.getElementById("connect").innerHTML = "<p>Connection: error</p>"
	socket.close()
})

function transmitMessage(message) 
{
	socket.send( message );
}

socket.on('message', data => {
	console.log( data );
	dane = JSON.parse(data)
	
	switch(dane.cmd)
	{
		case "join":
			updateRoom(dane)
			break
		case "leave":
			updateRoom(dane)
			break
		case "ready":
			wyswietlGotowosc(dane.status)
			break
		case "start":
			wyswietlDaneGry(dane)
			break
		case "move":
			wyswietlDaneGry(dane)
			break
		case "end":
			endGame(dane)
			break
	}
})



