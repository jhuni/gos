(function() {
	
var getInBetweenCoordinates = function(move, interval) {
	
	var rval = [];
	
	var cd = move.start.byval().addCoord(interval);
	
	while( !(cd.x == move.end.x && cd.y == move.end.y)  ) {
		rval[rval.length] = cd.byval();
		cd.addCoord(interval);
	}
	
	return rval;
	
};

Joose.Class('chess.model.gamestate', {
	
	constructor: function(pos, turn) {
		this.pos = pos;
		this.turn = turn;
		
		this.Onload();	
	},
	
	has: {
		pos: {},
		turn: {}
	},
	
	methods: {
		
		Onload: function() {
			this.turnModifier = this.turn === 'black' ? -1 : 1;
		},
		
		getCoordColor: function(cd) {
		
			var value = this.pos.get(cd);
			
			if( value === 0 ) {
				return 'blank';
			} else {
				return( (value>0) ? 'white' : 'black' );
			}
			
		},
		
		oppositeTurn: function() {
			return (this.turn==='white') ? 'black' : 'white';
		},
		
		toggleTurns: function() {
			this.turn = this.oppositeTurn();
			this.turnModifier *= -1;
		},
		
		isValidMove: function(move) {
			
			move.type = 'normal';
			var	startingValue = Math.abs(this.pos.get(move.start));
			
			if( this.getCoordColor(move.end) === this.turn ) {
				return false;	
			}
			
			// Calculate distances:
			var dist = move.getDistCoord();
			dist.x = Math.abs(dist.x);
			dist.y = Math.abs(dist.y);
			
			if( startingValue === 1 ) {
				
				var actualY = move.end.y-move.start.y;
				var distanceToEnd = move.end.y;
				if( this.turn === 'black' ) {
					distanceToEnd = 7-distanceToEnd;
				}
				
				// Can only go forward:
				if( this.turn === 'black' ) {
					if( actualY < 0 ) { return false; }
				} else {
					if( actualY > 0 ) { return false; }
				}
				
				// Maximum distances:
				if( dist.x > 1 || dist.y > 2 || (dist.x == 1 && dist.y != 1) ) {
					return false;
				}
				
				var endColor = this.getCoordColor(move.end);
				if( dist.x == 1 ) {
					if( endColor == 'blank' ) {
						
						// Check for empassant:
						if( distanceToEnd != 2 ) {
							return false;
						}
						
						var empcd = new coord(move.end.x,move.end.y+this.turnModifier);
						var val = this.pos.get(empcd);
						
						if( Math.abs(val) != 1 ) {
							return false;
						}
						
						move.type = 'en passant';
						
					} else if( endColor !== this.oppositeTurn()  ) {
						return false;
					}
				} else {
					// Cannot capture pieces if you aren't going on the x axis
					if( endColor != 'blank' ) {
						return false;
					}
				}
				
				// You can only move pawns up two on the first move	
				if( dist.y == 2 ) {
					if( distanceToEnd != 4 ) {
						return false;
					}
				}
				
				// Promotions:
				if( distanceToEnd == 0 ) {
					move.type = 'promotion';
				}
				
			} else if( startingValue === 2 ) {
				
				if( !( dist.x === 1 && dist.y === 2 ) && !( dist.x === 2 && dist.y === 1 ) ) {
					return false;
				}
				
			} else if( startingValue === 3 ) {
				if( dist.x !== dist.y ) {
					return false;
				}
			} else if( startingValue === 4 ) {
				
				if( dist.x > 0 && dist.y > 0 ) {
					return false;
				}
				
			} else if( startingValue === 5 ) {
				if( dist.y == 0 && dist.x == 2 ) {
					// king has never moved, rook has never moved, king is not in check, and
					// the king does not cross over or end on a checked square
					move.type = 'castle';
				} else if( dist.x > 1 || dist.y > 1 ) {
					return false;
				}	
			} else if( startingValue === 6 ) {
				if( !(dist.x === dist.y || dist.x === 0 || dist.y === 0) ) {
					return false;
				}
			}
			
			// make sure we are not jumping over any pieces:
			if( startingValue != 2 && startingValue != 5 ) {
				
				// calculate "inter"
				var d = move.getDistCoord();
				var inter = new coord(0,0);
				if( d.x >= 1 ) { inter.x = 1; }
				if( d.x <= -1 ) { inter.x = -1 }
				if( d.y >= 1 ) { inter.y = 1; }
				if( d.y <= -1 ) { inter.y = -1 }
					
				var cds = getInBetweenCoordinates(move, inter);
				
				for( var i = 0, l = cds.length; i < l; i++ ) {
					if( this.pos.get(cds[i]) != 0 ) {
						return false;
					}
				}
				
			}
			
			return true;
		}
			
	}
	
});
	
	



})();
