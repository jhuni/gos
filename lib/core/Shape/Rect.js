/*jsan __header__ */

JSAN.use('CKIT');
JSAN.use('coord');
JSAN.use('tbsize');

/*jsan __end__ */

Joose.Class('Shape.Rect', {

	constructor: function(cd,sz) {
		this.coord = cd;
		this.size = sz;
	},
	
	has: {
		coord: {},
		size: {}
	},
	
	methods: {
		toString: function() {
			var xval = (this.coord.x >= 0) ? "+" : "-";
			var yval = (this.coord.y >= 0) ? "+" : "-";
			return( this.size.toString() + xval + this.coord.x + yval + this.coord.y );
		},
		
		containsCoord: function(cd) {
			var x = this.coord.x;
			var y = this.coord.y;
			return( cd.x >= x && cd.y >= y && cd.x <= (x+this.size.width) && cd.y <= (y+this.size.height) );
		},
		
		getEndPoint: function() {
			return( new coord(this.coord.x+this.size.width,this.coord.y+this.size.height) );
		},
		
		byval: function() {
			return( Shape.Rect.fromNums(this.coord.x,this.coord.y,this.size.width,this.size.height) );
		}
	}


});




CKIT.Utils.Base.update(Shape.Rect, {
		
	fromNums: function(x,y,width,height) {
		return( new Shape.Rect(new coord(x,y), new tbsize(width,height))   );
	},
	
	fromString: function(str) {
		
		var position = str.split(/\+|\-/);
		var cd = new coord(parseInt(position[1],10), parseInt(position[2],10));
		return new Shape.Rect( cd, tbsize.fromString(position[0]) );
		
	}
	
});
