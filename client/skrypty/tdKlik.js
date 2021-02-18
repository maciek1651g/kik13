pawn=""
tab = [["","",""],["","",""],["","",""]]

function tdKlik(sender, x,y)
{
	if(pawn=="X" || pawn=="O")
	{
		if(pawn=="X")
		{
			sender.innerHTML = "<img src='./img/krzyz.png' alt='X'/>"
		}
		else if(pawn=="O")
		{
			sender.innerHTML = "<img src='./img/kolo.png' alt='O'/>"
		}
		tab[x][y]=pawn
		transmitMessage('{"cmd":"move", "room": "'+getURLParam("idRoom")+'", "board":'+JSON.stringify(tab)+'}')
	}
}