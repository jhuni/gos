JSAN.use('CKIT');
JSAN.use('Grid');

/* THIS LIBRARY IS AN EXTENSION */

CKIT.Utils.Base.assign('Grid.Transformations');

Grid.addMethods({
	
	swapCoordinates: function(start,end) {
		var temp = this.get(start);
		this.set(  start, this.get(end)  );	
		this.set(  end, temp  );
	},
	
	reverseX: function() {
		
		for( var i = 0; i < this.size.height; i++ ) {
			var start = this.size.width*i;
			var end = start+this.sz.width-1;
			while( start < end ) {
				this.swapIndexes(start++,end--)
			}
		}
		
		return this;
	},
	
	reverseY: function() {
		
		for(var i = 0; i < this.sz.width; i++ ) {
			var start = new coord(i,0);
			var end = new coord(i,this.sz.height-1);
			while( start.y < end.y ) {
				this.swapCoordinates(start, end );
				
				start.y++;
				end.y--;
			}
		}
		return this;
	},
	
	exchangeXY: function() {
		var cur = this.byval();
		var self = this;
		this.size.exchangeXY().loopGrid(function(cd) {
			self.set(cd, cur.get( cd.byval().switchXY() ));
		} );
		return this;
	}
	
});
