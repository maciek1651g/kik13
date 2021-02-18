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