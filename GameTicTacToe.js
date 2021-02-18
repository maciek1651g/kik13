class GameTicTacToe
{
	constructor(idRoom, clients, size=3)
    {
		var tab = [];
		for(var i=0;i<size;i++)
		{
			tab[i] =[];
			for(var j=0;j<size;j++)
			{
				tab[i][j] = "";
			}
		}
		
		this.board = tab;
		this.idRoom = idRoom;
        this.players = Array.from(clients);
		this.turn = getRandomInt(0,1)
        this.pawn = []
		if(this.turn == 0)
		{
			this.pawn[0]="X";
			this.pawn[1]="O";
		}
		else
		{
			this.pawn[0]="O";
			this.pawn[1]="X";
		}
	}

    sendMoveToAll(io, stage='move')
    {
        var turn=0
        var pawn="O"
        var board = JSON.stringify(this.board)

        for(var i=0;i<this.players.length;i++)
        {
            if(i==this.turn)
            {
                turn=1
            }
            else
            {
                turn = 0
            }
            pawn = this.pawn[i]

            const msg = '{"cmd":"'+stage+'", "turn":"'+turn+'", "pawn": "'+pawn+'", "board":'+board+'}'
            io.of("/").sockets.get(this.players[i]).send(msg)
        }
    }

    checkCorrect(board)
    {
        var changes = 0

        if(board.length==this.board.length)
        {
            for(var i=0;i<board.length;i++)
            {
                if(board[i].length==this.board[i].length)
                {
                    for(var j=0;j<board[i].length;j++)
                    {
                        if(board[i][j]!=this.board[i][j])
                        {
                            changes+=1

                            if(changes>=2 || board[i][j]!=this.pawn[this.turn])
                            {
                                return false
                            }
                        }
                    }
                }
                else
                {
                    return false
                }
            }
        }
        else
        {
            return false
        }

        return true
    }

    checkWin(pawn)
    {
        for(var i=0;i<this.board.length;i++)
		{
			var count = 0;
			for(var j=0;j<this.board[i].length;j++)
			{
				if(pawn==this.board[i][j])
				{
					count+=1;
				}
			}
			if(count==3)
			{
				return true;
			}
		}
		for(var i=0;i<this.board.length;i++)
		{
			var count = 0;
			for(var j=0;j<this.board[i].length;j++)
			{
				if(pawn==this.board[j][i])
				{
					count+=1;
				}
			}
			if(count==3)
			{
				return true;
			}
		}
		var count = 0;
		for(var i=0;i<this.board.length;i++)
		{
			if(pawn==this.board[i][i])
			{
				count+=1;
			}
		}
		if(count==3)
		{
			return true;
		}
		count = 0;
		for(var i=0;i<this.board.length;i++)
		{
			if(pawn==this.board[i][2-i])
			{
				count+=1;
			}
		}
		if(count==3)
		{
			return true;
		}
		
		return false;
    }

    checkDraw()
    {
        var count=0;
		for(var i=0;i<this.board.length;i++)
		{
			for(var j=0;j<this.board[i].length;j++)
			{
				if(this.board[i][j]!="")
				{
					count+=1;
				}
			}

		}
		if(count==9)
			return true;
		return false;
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max+1);
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = GameTicTacToe