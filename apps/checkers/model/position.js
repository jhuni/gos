Joose.Class("checkers.model.position", {
	
	constructor: function(board, playerToMove) {
		this.board = board;
		this.playerToMove = playerToMove;
	},
	
	has: {
		board: {},
		playerToMove: {}
	},
	
	methods: {
		
		moveCell: function(move, pieceMoving) {
			this.board.set(move.start, 0 );
			
			if( (pieceMoving == 1 && move.end.y == 0) || (pieceMoving == 2 && move.end.y == 7) ) {
				this.board.set(move.end,pieceMoving+2);
			} else {
				this.board.set(move.end, pieceMoving );
			}
			
		},

		clearLastJump: function() {
			this.board.set( this.lastJump, 0 );
		},

		setToStart: function() {
			this.board.setValuesToList(checkers.model.position.startBoard);
			this.playerToMove = checkers.model.position.startPlayer;
		},

		oppositeTurn: function() {
			return (this.playerToMove == 1) ? 2 : 1;
		},

		toggleTurns: function() {
			this.playerToMove = this.oppositeTurn();
		},

		isOwnedBy: function(player, cellValue) {
			return( cellValue == player || cellValue == player+2 );
		},

		canJump: function() {
			return(   (this.getJumpMoves()).length > 0   );
		},

		getJumpMoves: function() {
			
			var rval = [];
			var self = this;
			var i = 0;
			
			this.board.size.loopGrid( function(cd) {
				
				var cellValue = self.board.get(cd);
				
				// Look through all of the pieces owned by the current player:
				if( self.isOwnedBy( self.playerToMove, cellValue ) ) {
					
					var legalDirections = (new checkers.model.piece(cellValue)).getLegalDirections();
					
					// Look through all the places that piece can move
					legalDirections.surroundCoord( cd, self.board.size, function(jumpCoord) {
						
						if( self.isOwnedBy(self.oppositeTurn(), self.board.get(jumpCoord) ) ) {
							
							var direction = coord.sum(jumpCoord, cd.inverse());
							var endCoord = coord.sum(  cd, direction.multiply(2)  );
							if( !self.board.size.containsCoord(endCoord) ) {
								return 0;
							}
							
							if( self.board.get(endCoord) === 0 ) { 
								rval.push(new Shape.LineSegment(cd,endCoord));
							}
						}
						
					});
					
				}
				
				i++;
			} );
			
			return rval;
			
		},

		isPossibleMove: function(move) {
			
			this.lastJump = -1;
			
			var distCoord  = move.getDistCoord();
			var piece = new checkers.model.piece(this.board.get(move.start));
			
			// piece.canMove checks if it is a move that piece can possibly do
			if (!(piece.canMove(distCoord) && this.board.get(move.end) === 0)) {
				return false;
			}
			
			// This is based of course on the fact that x and y must be equal		
			var moveDistance = Math.abs(distCoord.x);
			
			if( moveDistance == 2 ) {
				this.lastJump = move.getMidPoint();
				
				if( !this.isOwnedBy( this.oppositeTurn(), this.board.get(this.lastJump) ) ) { 
					this.lastJump = -1;
					return false; 
				}
				
			} else {
				
				// The only other case is if you are moving only one square distance
				if(  this.canJump()  ) { 
					return false; 
				}
				
			}	
				
				
			
			return true;
			
		}	
			
	}
	
});






CKIT.Utils.Base.update(checkers.model.position, {
	
	
	startBoard: new Grid([
		0,2,0,2,0,2,0,2,
		2,0,2,0,2,0,2,0,
		0,2,0,2,0,2,0,2,
		0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,
		1,0,1,0,1,0,1,0,
		0,1,0,1,0,1,0,1,
		1,0,1,0,1,0,1,0  
	], new tbsize(8,8) ),
	
	startPlayer: 1
	
});
















/*

=head1 NAME

checkers.model.position

=head1 SYNOPSIS

=head1 DESCRIPTION

=head1 CONSTRUCTOR

=head2 board

This value is an array of cell_values from 0 to 4.
 	
	[BLANK_SQUARE, PLAYER_ONE, PLAYER_TWO, PLAYER_ONE_KING, PLAYER_TWO_KING]

Any cell_value with a value greater then three is a king of the player
that is cell_value minus two. You can use (cell_value%2) to find the player

=head2 playerToMove

This value is the player whos turn it is to move. Player one tends to go
first and he tends to be on the bottom of the board where as player
two is on the top and goes second.

=head2 gridSize

This is a derivative of the grid board.

=head1 METHODS

=head1 AUTHOR

Jhuni <jhuni_x@yahoo.com>

=head1 COPYRIGHT

GNU General Public license.
(a copy of the license should have been shipped with this program).


*/
