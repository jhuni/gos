(function() {

var gds = Grid.Directions;
var goDirections = new Grid.CoordMap([gds.n, gds.s, gds.e, gds.w]);

Joose.Class('awmap.model.map', {
	
	constructor: function(terrain, units) {
		this.terrain = terrain;
		this.units = units;
	},
	
	has: {
		terrain: {},
		units: {}
	},
	
	methods: {
		
		randomize: function() {
			for( var i = 0, l = this.terrain.elems; i < l; i++ ) {	
				this.terrain.setIndex(i, Math.floor(Math.random()*154) );	
			}
		},
		
		fixSquares: function() {
			
			for( var i = 0, l = this.terrain.elems; i < l; i++ ) {
				
				var cd = coord.fromIndex(i,this.terrain.size.width);
				var val = this.terrain.getIndex(i);
				
				if( val < 50 ) {
					if( val >= 4 && val <= 14 ) {
						this.terrain.setIndex(i,0);
					}
				}
				
				
			}
			
		}
			
	}
	
});


})();
