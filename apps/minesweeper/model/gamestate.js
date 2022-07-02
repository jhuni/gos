CKIT.Class.assign('minesweeper.model.gamestate', {
	
	Has: ['field', 'pos'],
	
	/*****
	=head2 createSurroundField() Returns this
	*****/
	
	createSurroundField: function() {
		var size = this.field.size;
		var field = this.field;
		
		var rval = new Grid([], size);
		var i = 0;
		size.loopGrid( function(cd) {
			
			var minecount = 0;
			
			Grid.Directions.neighbourMap.surroundCoord( cd, size, function(cd) {
				( field.get(cd) == "1" ) ? minecount++ : 0;
			} );
			
			
			rval.values[i++] = minecount;
		});
		
		this.sfield = rval;
		return this;
		
	},
	
	
	/*****
	=head2 isWon() Returns Bool	
	*****/
	
	isWon: function() {
		
		var isWon = true;
		var pos = this.pos;
		var i = 0;
	
		// none are mineless and what not
		this.field.forEach( function(bit) {
			
			if( bit === 0 && pos.getIndex(i) === 0 ) {
				isWon = false;
			}
			
			i++;
		});
		
		return isWon;
		
	}
	
});

minesweeper.model.gamestate.instances = {};
