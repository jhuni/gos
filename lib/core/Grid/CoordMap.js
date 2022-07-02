JSAN.use('CKIT');

CKIT.Class.assign('Grid.CoordMap', {

	Has: ['v'],
	
	Extends: [CKIT.List],
	
	Onload: function() {
		// aliases:
		this.coords = this.v;
		this.cds = this.v;
		
		// important information:
		this.elems = this.v.length;
		this.iterIndex = 0;
	},
	
	getIndex: function(index) {
		return this.v[index];
	},
	
	setIndex: function(index, value) {
		this.v[index] = value;
	},
	
	surroundCoord: function(epicenter, size, func) {
		
		for( var i = 0, j = this.cds.length;	i<j; i++ ) {
			
			var newCoord = coord.sum( epicenter, this.cds[i] );
			
			if( size.containsCoord(newCoord) ) {
				func(newCoord);
			}
			
		}
		
	},
	
	getGridValues: function(grid) {
		return this.map( function(cd) {
			return grid.get(cd);			
		} );
	},
	
	setGridValues: function(grid,value) {
		for( var i = 0, l = this.elems; i < l; i++ ) {
			grid.set( this.getIndex(i), value );
		}
	},
	
	toString: function() {
		return this.cds.join("\n");
	},
	
	isEqualTo: function(cd) {
		var rval = new CKIT.TruthTable(0,0);
		
		this.forEach( function(currentCoord) {
			rval.addCondition( currentCoord.x == cd.x && currentCoord.y == cd.y );
		});
		
		return rval;	
	},
	
	containsCoord: function(cd) {
		return( this.isEqualTo(cd).any() );
	}
	
	
	
		
});
