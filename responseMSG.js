const GameTicTacToe = require('./GameTicTacToe')
const makeid = require('./makeid')

function allReady(clients, io)
{
    if(clients.size<2)
        return false

    var tab = Array.from(clients)

    for(var i=0;i<tab.length;i++)
    {
        if(!(io.of("/").sockets.get(tab[i]).readyToGame))
            return false
    }

    return true
}

module.exports = 
{
    joinRoom : (from, io, idRoom="") => {
        const clients = io.sockets.adapter.rooms.get(idRoom);
        const numClients = clients ? clients.size : 0;
        

        if(!(clients) || numClients<2)
        {
            if(idRoom=="")
            {
                idRoom = makeid(10)
            }
            
            from.join(idRoom)
            io.in(idRoom).send('{"cmd":"join", "status":true, "numPlayers":'+(numClients+1)+'}');
        }
        else if(clients.has(from.id))
        {
            from.send('{"cmd":"join", "status":true, "numPlayers":'+numClients+'}');
        }
        else
        {
            from.send('{"cmd":"join", "status":false}')
        }
    },

    leaveRoom: (from, io, idRoom="") => {
        const clients = io.sockets.adapter.rooms.get(idRoom);
        let numClients = 0

        if(clients && clients.has(from.id))
        {
            from.leave(idRoom)
            numClients = clients ? clients.size : 0;
            
            if(from.readyToGame)
                from.readyToGame = false

            from.send('{"cmd":"leave", "status":true}')

            if(numClients!=0)
            {
                io.to(idRoom).send('{"cmd":"leave", "status":true, "numPlayers":'+numClients+'}');
                if(io.games[idRoom])
                {
                    io.to(idRoom).send('{"cmd":"ready", "status":false}')
                    io.games[idRoom] = null
                }
            }
        }
        else
        {
            from.send('{"cmd":"leave", "status":false}')
        }
    },

    ready: (from, io, idRoom="") => {
        const clients = io.sockets.adapter.rooms.get(idRoom);

        if(clients && clients.has(from.id))
        {
            from.readyToGame = true
            from.send('{"cmd":"ready", "status":true}');

            if(allReady(clients, io))
            {
                var game = new GameTicTacToe(idRoom, clients)
                io.games[idRoom] = game
                game.sendMoveToAll(io, "start")
            }
        }
        else
        {
            from.send('{"cmd":"ready", "status":false}');
        }
    },

    move: (from, io, idRoom="", board) => {
        if(io.games[idRoom])
        {
            var g = io.games[idRoom]
            var t = g.turn
            var p = g.pawn[t]
            var uncorrect = false

            if(from.id == g.players[t])
            {
                if(g.checkCorrect(board))
                {
                    g.board = board
                    g.turn = (g.turn+1)%2
                    var b = JSON.stringify(g.board)
                    var win = g.checkWin(p)
                    var draw = g.checkDraw()

                    console.log(g.board)
                    console.log(win)

                    if(win || draw)
                    {
                        if(win)
                        {
                            for(var i=0;i<g.players.length;i++)
                            {
                                var msg=""
                                var player =  io.of("/").sockets.get(g.players[i])

                                if(from.id==player.id)
                                {
                                    msg = '{"cmd":"end", "result":"win", "board":'+b+'}';
                                }
                                else
                                {
                                    msg = '{"cmd":"end", "result":"lose", "board":'+b+'}';
                                }
                                
                                player.send(msg);
                                player.readyToGame = false;
                            }
                        }
                        else
                        {
                            io.in(idRoom).send('{"cmd":"end", "result":"draw", "board":'+b+'}')
                        }
                        io.games[idRoom] = null;
                    }
                    else
                    {
                        g.sendMoveToAll(io)
                    }
                }
                else
                {
                    uncorrect = true
                }
            }
            else
            {
                uncorrect = true
            }

            if(uncorrect)
            {
                from.send('{"cmd":"error", "description":"Zły ruch!"}')
            }
        }
        else
        {
            from.send('{"cmd":"error", "description":"Nie rozpoczęto gry!"}')
        }
    }
}

