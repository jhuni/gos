
(function() {
	
var gds = Grid.Directions;
var goDirections = new Grid.CoordMap([gds.n, gds.s, gds.e, gds.w]);

CKIT.Class.assign('goban.model.gamedata', {
	
	Has: ['board', 'turn'],
	
	oppositeTurn: function() {
		return (this.turn == 0) ? 1 : 0;	
	},

	toggleTurns: function() {
		this.turn = this.oppositeTurn();
	},

	isValidMove: function(cd) {
		return (this.board.get(cd) == -1);
	},

	// Gets an array of coordinates and how many liberties said coordinates have.
	analyzeChain: function(startCoord) {
		
		var self = this;
		var liberties = false;
		var currentTurn = self.board.get(startCoord);
		
		// This is all coordinates that have already been analyzed
		// we must keep this to avoid infinite recursion
		var cds = new Grid.CoordMap([startCoord]);

		var analyzeCoordinate = function(cd) {
			
			if( self.board.get(cd) === -1 ) {
				liberties = true;
			} else if( self.board.get(cd) === currentTurn ) {
		
				if( !cds.containsCoord(cd) ) {
					cds.push(cd);
					goDirections.surroundCoord(cd, self.board.size, analyzeCoordinate);
				}
				
			}
		};
		
		// Start the analyzation:
		goDirections.surroundCoord(startCoord, this.board.size, analyzeCoordinate);
		
		
		// If there is no liberties you might as well get rid of the chains elements:
		if( !liberties ) {
			cds.setGridValues(this.board,-1);
		}
		
		return liberties;
		
	},

	makeMove: function(moveCoord) {

		this.board.set(moveCoord,this.turn);
		
		var self = this;
		var opturn = this.oppositeTurn();
		
		// Analyze all of the coordinates surrounding this one in which
		// are of the opposite turn, to look for captured pieces.
		goDirections.surroundCoord(moveCoord,this.board.size,function(cd){
			if( self.board.get(cd) == opturn ) {
				self.analyzeChain(cd);
			}
		});
		
		this.toggleTurns();
		
	}

});
	
	
})();


/*

=head1 NAME

goban.model.gamedata - deal with gamedata in go.

=head1 DESCRIPTION

This module has everything that it takes to effectively play a
human vs human go game. This module is seperate from any artificial intelligence
modules related to go, it merely provides utility functionality to 
make a human vs human game possible.

=head1 CONSTRUCTOR

=head2 board

This is an array of three possible values: [-1,0,1] where as -1 is a 
value in which has no unit placed on the board. One and zero are turns.

	[
    [-1, -1, -1, -1, -1],
	[-1, -1,  0,  0, -1],
	[-1,  0,  1,  1,  1],
	[-1, -1,  1,  1,  0],
	[-1, -1, -1, -1, -1]
	]

=head2 turn

This is either one or zero and it is the turn of the game.

=head2 boardSize

This value is the size of the board the game is being played on. This is
from the size of the grid position.

=head1 METHODS



=head1 AUTHOR

Jhuni, <jhuni_x@yahoo.com>

=head1 COPYRIGHT

GNU General Public License

*/
