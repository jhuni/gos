JSAN.use('CKIT');
JSAN.use('Grid');
JSAN.use('Grid.Directions');
JSAN.use('Grid.CoordMap');

CKIT.Utils.Base.assign('Grid.Rank', {});

Grid.addMethods( {
		
	createCoordMap: function(startCoord, direction) {
		
		var rval = [];
		
		var currentCoord = startCoord.byval();
		while(1) {
			
			rval[rval.length] = currentCoord.byval();
			
			currentCoord.addCoord(direction);
			if( !this.size.containsCoord(currentCoord) ) {
				return new Grid.CoordMap(rval);	
			}
				
		}
		
	},

	getXRank: function(y) {
		return this.createCoordMap(new coord(0,y), Grid.Directions.e);
	},

	getAllXRanks: function() {
		var self = this;
		var rval = [];
		
		for( var i = 0; i < this.size.height; i++ ) {
			rval[rval.length] = self.getXRank(i);
		}
		
		return rval;
	},

	getYRank: function(x) {
		return this.createCoordMap(new coord(x,0), Grid.Directions.s); 
	},

	getAllYRanks: function() {
		var self = this;
		var rval = [];
		
		for( var i = 0; i < this.size.width; i++ ) {
			rval[rval.length] = self.getYRank(i);
		}
		
		return rval;
	},

	block: function(blockCoord, blockSize) {
		
		var startCoord = new coord( blockCoord.x * blockSize.width, blockCoord.y * blockSize.height );
		var coordinates = [];
		
		blockSize.loopGrid( function(cd) { 
			coordinates[coordinates.length] = coord.sum(startCoord,cd);
		});
		
		return new Grid.CoordMap(coordinates);
		
	},

	getAllBlocks: function(blockSize) {
		
		var allBlocks = [];
		var self = this;
		blockSize.loopGrid( function(cd) {
			allBlocks[allBlocks.length] = self.block(cd,blockSize);
		});
		return allBlocks;
		
	},

	getDiagonal: function(diagonalNumber, isPositive) {
		
		
		
	}



})();
