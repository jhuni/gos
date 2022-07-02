CKIT.Class.assign('gnometris.model.gamestate', {
	
	Has: ['size'],
	
	Onload: function() {
		
		this.pos = Grid.fromRepetition(-1, this.size);
		this.activeCoords = new Grid.CoordMap([]);
		this.epicenter = new coord(0,0);
		this.activeValue = -1;
			
	},
	
	// This moves the active coords based on (cd) if possible
	moveActiveCoords: function(cd) {
		
		var tempCoords = new Grid.CoordMap([]);
		
		for( var i = 0, l = this.activeCoords.elems; i < l; i++ ) {
			
			var currentCoord = coord.sum(this.activeCoords.getIndex(i), cd);
			tempCoords.push(currentCoord);
			
			if( !this.size.containsCoord(currentCoord) ) {
				return cd.y > 0;
			}
			
			if( this.pos.get(currentCoord) != -1 ) {
				if( !this.activeCoords.containsCoord(currentCoord) ) {
					return cd.y > 0;	
				}
			}
			
		}
		
		this.clearActiveCoords();
		this.activeCoords = tempCoords;
		this.placeActiveCoords();
		
		this.epicenter.addCoord(cd);
		
		return false;
		
	},
	
	// This uses a predefined shape and it tries to set the activeCoords to it.
	setupShape: function(epicenter,shape,value) {
		
		var pos = this.pos;
		var cds = new Grid.CoordMap([]);
		var isValid = true;
		
		shape.size.loopGrid( function(shapeCoord) {
			if( shape.get(shapeCoord) === 1 ) {
				var cd = coord.sum(epicenter, shapeCoord);
				
				if( pos.size.containsCoord(cd) && pos.get(cd) == -1 ) {
					cds.push(cd);
				} else {
					isValid = false;
				}
				
			}
		} );
		
		if(isValid) {
			this.activeCoords = cds;
		}	
		
		return isValid;
		
	},
	
	clearActiveCoords: function() {
		this.activeCoords.setGridValues(this.pos,-1);
	},
	
	placeActiveCoords: function(value) {
		this.activeCoords.setGridValues(this.pos,this.activeValue);	
	}
	
	
});
