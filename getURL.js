function getURLParam(strParamName, strHref)
{
	strParamName = strParamName.toLowerCase();
	var strReturn = "";
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

module.exports = getURLParam

	// var idRoom = getUrl("idroom" ,socket.handshake.headers.referer)
	// if(idRoom=="")
	// {
	// 	idRoom = makeid(10)
	// 	socket.join(idRoom)
	// 	socket.send('{}')
	// }