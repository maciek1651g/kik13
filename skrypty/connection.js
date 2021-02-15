function getURLParam(strParamName)
{
	strParamName = strParamName.toLowerCase();
	var strReturn = "";
	var strHref = window.location.href;
	if ( strHref.indexOf("?") > -1 )
	{
		var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
		var aQueryString = strQueryString.split("&");
		for ( var iParam = 0; iParam < aQueryString.length; iParam++ )
		{
			if (aQueryString[iParam].indexOf(strParamName + "=") > -1 )
			{
				var aParam = aQueryString[iParam].split("=");
				strReturn = aParam[1];
				break;
			}
		}
	}
  return strReturn;
}

// Create a new WebSocket.
var socket  = new WebSocket('ws://localhost:8080');

socket.onopen = function (event) 
{
	alert("Połączono")
	//document.getElementById("connect").innerHTML = "<p>Connection: open</p>"
}

socket.onerror = function (event)
{
	alert("Błąd połączenia")
	//document.getElementById("connect").innerHTML = "<p>Connection: error</p>"
}

function transmitMessage(message) 
{
	socket.send( message );
}

socket.onmessage = function(e)
{
	//console.log( e.data );
	alert( e.data );
	// dane = JSON.parse(e.data)
	
	// switch(dane.cmd)
	// {
		// case "join":
			// updateRoom(dane)
			// break
		// case "leave":
			// updateRoom(dane)
			// break
		// case "ready":
			// wyswietlGotowosc(dane.status)
			// break
		// case "start":
			// wyswietlDaneGry(dane)
			// break
		// case "move":
			// wyswietlDaneGry(dane)
			// break
		// case "end":
			// endGame(dane)
			// break
	// }
}

function updateRoom(dane)
{
	if(dane.status==true)
	{
		if(typeof dane.numPlayers !== 'undefined')
			document.getElementById("pokoj").innerHTML = "<p>Liczba graczy: "+dane.numPlayers+"</p>"
		else
			document.getElementById("pokoj").innerHTML = "<p>Wyszedłeś z pokoju</p>"
	}
}

function wyswietlDaneGry(dane)
{
	if(dane.turn=="1")
	{
		document.getElementById("kolej").innerHTML = "<p>Twój ruch</p>"
	}
	else
	{
		document.getElementById("kolej").innerHTML = "<p>Ruch przeciwnika</p>"
	}
	
	
	pawn = dane.pawn
	tab = dane.board
	wyswietlTabele(tab)
}

function endGame(dane)
{
	tab = dane.board
	wyswietlTabele(tab)
	
	if(dane.result=="win")
	{
		document.getElementById("kolej").innerHTML = "Wygrana!"
		alert("Brawo wygrałeś!")
	}
	else if(dane.result=="lose")
	{
		document.getElementById("kolej").innerHTML = "Przegrałeś"
		alert("Niestety przegrałeś")
	}
	else if(dane.result=="draw")
	{
		document.getElementById("kolej").innerHTML = "Remis"
		alert("Remis")
	}
	
}

function wyswietlGotowosc(ready)
{
	if(ready)
		document.getElementById("gotowosc").innerHTML = "<p>Gotowy</p>"
	else
		document.getElementById("gotowosc").innerHTML = "<p>Za mała liczba graczy</p>"
}