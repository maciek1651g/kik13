function wyswietlTabele(tab)
{
	var wynik = "<table border=1>"
	
	if(tab.length>=3)
	{
		for(var i=0;i<tab.length;i++)
		{
			wynik += "<tr>"
			for(var j=0;j<tab[i].length;j++)
			{
				switch(tab[i][j])
				{
					case "X":
						wynik += "<td><img src='./img/krzyz.png' alt='X'/></td>"
						break
					case "O":
						wynik += "<td><img src='./img/kolo.png' alt='O'/></td>"
						break
					case "":
						wynik += "<td class='tdKlikalne' onclick='tdKlik'></td>"
						break
					default:
						wynik += "<td class='tdKlikalne' onclick='tdKlik'></td>"
				}
			}
			wynik += "</tr>"
		}
	}
	
	wynik += "</table>"
	
	document.getElementById("game").innerHTML = wynik
}