Joose.Class('checkers.model.piece', {
	
	constructor: function(pieceValue) {
		this.pieceValue = pieceValue;	
	},

	has: {
		pieceValue: {}
	},
	
	methods: {
		
		getCellDirections: function() {
			// 0 = blank piece = cannot move in either direction
			// 1,2 = move according to player
			// 3,4 = kings so they can move either way
			return [ [0,0], [0,1], [1,0], [1,1], [1,1] ];
		},
		
		canMove: function(distCoord) {
			
			var moveDistance = Math.abs(distCoord.x);
			
			var isDiagonal = Math.abs(distCoord.x) == Math.abs(distCoord.y);
			
			var isValidDirection = (this.getCellDirections()[ this.pieceValue ])[ (0 > distCoord.y) ? 1:0 ];
			
			// Pieces move diagonally for 1-2 squares, in a specified direction
			return( moveDistance <= 2 && isDiagonal && isValidDirection );
			
		},
		
		getLegalDirections: function() {
			
			var rval = [];
			var directions = this.getCellDirections()[this.pieceValue];
			
			if( directions[0] === 1 ) {
				rval.push(Grid.Directions.sw, Grid.Directions.se);
			}
				
			if( directions[1] === 1 ) {
				rval.push(Grid.Directions.nw, Grid.Directions.ne);
			}
				
			return new Grid.CoordMap(rval);
	
		}
		
	}
	
});
