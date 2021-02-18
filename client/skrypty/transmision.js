function joinToRoom()
{
	transmitMessage('{"cmd":"join", "room": "'+getURLParam("idRoom")+'"}')
}

function readyToGame()
{
	transmitMessage('{"cmd":"ready", "room": "'+getURLParam("idRoom")+'"}')
}

function leaveRoom()
{
	transmitMessage('{"cmd":"leave", "room": "'+getURLParam("idRoom")+'"}')
}