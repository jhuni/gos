// Class tictactoe.gamedata

CKIT.Class.assign('tictactoe.model.gamedata', {
	
	Has: ['cells', 'turn', 'connections'],
	
	init: function() {
		
		// stackPoint == stack.length in normal cases
		this.history = {
			stack: [],
			stackPoint: 0	
		};
		
	},
	
	makeMove: function(cd) {
		
		this.cells.set(cd, this.turn);
		this.toggleTurns();
		this.turnNumber++;
		
		if( this.history.stack.length != this.history.stackPoint ) {
			this.history.stack.length = this.history.stackPoint;
		}
		
		// Change the stack:
		this.history.stack.push(cd);
		this.history.stackPoint++;
		
	},
	
	undoMove: function() {
	
		if( this.history.stackPoint == 0 ) {
			return;	
		}
		
		var cd = this.history.stack[this.history.stackPoint-1];
		this.cells.set(cd,0);
		
		this.toggleTurns();
		this.history.stackPoint--;
		
	},
	
	redoMove: function() {
		
		if( this.history.stackPoint == this.history.stack.length ) {
			return;
		}
		
		var cd = this.history.stack[this.history.stackPoint];
		this.cells.set(cd,this.turn);
		
		this.toggleTurns();
		this.history.stackPoint++;
		
	},
	
	toggleTurns: function() {
		this.turn = this.oppositeTurn();
	},
	
	oppositeTurn: function() {
		return( (this.turn == 1) ? 2 : 1 );
	},

	isWinningMove: function(cd) {
		
		var connections = this.cells.checkForConnections(cd,this.connections, CKIT.Conditions.General.isEqualTo(this.oppositeTurn()) );
		return( connections.length !== 0 );
		
	}


});




/*

=head1 NAME

tictactoe.model.gamedata - deal with tictactoe positions

=head1 SYNOPSIS

	var pos = new tictactoe.model.gamedata(
	[  [0,0,0],
	   [2,2,1],
	   [0,0,1]   ],  1, 3);
	  
	pos.isWinningMove(new coord(2,0)) // Returns true
	alert('Player one wins');
	pos.clearSquares();

=head1 DESCRIPTION

This module has everything you need to program a tictactoe 
game in the human vs human mode. It stores the state of the
game and responds to the events to see if the game is over yet.
If however you want to play against a computer instead
the gamedata.ai module which extends the exact same data as this
one has an advanced artificial intellegience system.

=head1 CONSTRUCTOR

The constructor takes three arguments in the order (cells, turn, connections).

=head2 cells

This stores the current state of where all the pieces are in the game.

=head2 turn

This stores who is going to move next in the game. The value is one or
two because there is only two players in a tictactoe game although this might
be subject to change if there was a more advanced game.

=head2 connections

The amount of connections to search for to see if a user has won or lost the game.
This is generally three for the default cell size although it is possible to have
any cell size and any connection amount.

=head1 METHODS

=head2 oppositeTurn()

This subroutine just goes through and returns the turn opposite to the current
one. This is used every single time the game changes turns.

=head2 isWinningMove(coord)

This is used to check and see if the move the user did which is specified
by a coord in the coord module is a winning one and thus if the game is over.

=head2 clearSquares()

This just resets the cell array values to all zeros so that there are no
pieces anymore on the board. In essence it clears the board.

=head1 AUTHOR

Jhuni <jhuni_x@yahoo.com>

=head1 COPYRIGHT
GNU General Public license.
(a copy of the license should have been shipped with this program).


*/
