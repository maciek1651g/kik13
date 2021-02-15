const http = require('http')
const port = process.env.PORT || 3000

const handler = (req, res) => {
	console.log("Nowy użyszkodnik")
	res.end("<head><meta charset='UTF-8' /></head><body><h1>Witaj świecie</h1></body>")
}

const server = http.createServer(handler)

server.listen(port, (error) => {
	if(error)
		console.log("Błąd włączania serwera!")
	
	console.log("Serwer uruchomiony")
})