/*jsan __header__ */

JSAN.use('CKIT');
JSAN.use('coord');

/*jsan __end__ */

Joose.Class('tbsize', {
	
	constructor: function(width, height) {
		this.width = width;
		this.height = height;
	},
	
	has: {
		width: {},
		height: {}	
	},
	
	methods: {
		area: function() {
			return(this.width * this.height);
		},

		isSquare: function() {
			return( this.width == this.height );
		},

		toString: function() {
			return( this.width + "x" + this.height );	
		},

		byval: function() {
			return( new tbsize(this.width,this.height) );
		},

		containsCoord: function(cd) {
			return( cd.x >= 0 && cd.y >= 0 && cd.x < this.width && cd.y < this.height );
		},

		loopGrid: function(func) {
			var cd = new coord(0,0);
			for( cd.y = 0; cd.y < this.height; cd.y++ ) {
				for( cd.x = 0; cd.x < this.width; cd.x++ ) {
					func(cd);
				}	
			}
		},

		exchangeXY: function() {

			var temp = this.width;
			this.width = this.height;
			this.height = temp;
			return this;
			
		}		
	}
	
});

CKIT.Utils.Base.update(tbsize, {
	
	fromString: function(str) {
		
		var places = str.split(/\s*x/);
		return new tbsize( parseInt(places[0],10), parseInt(places[1],10)  );
		
	},

	fromMultiArray: function(multiArray) {
		
		return new tbsize(  multiArray[0].length, multiArray.length  );
		
	}

});


/*

=head1 NAME

tbsize - deal with size objects

=head1 DESCRIPTION

This deals with tabular sizes or grid sizes. Grids and tables are basically
just cases of rectangles, they have a width and a height. If the width
and the height are equal they are a square.

=head1 CONSTRUCTOR

=head2 width

This is the range of the x plane.

=head2 height

This is the range of the y plane.

=head1 METHODS

=head2 area()

Returns the area of a particular size eg width*height. For example
the area of a 5x5 rectangle is 25.
	
	//         4 height
	//         ......
	//         ......  24 total points. (4x6)
	// 6 width ......
	//         ......

=head1 AUTHOR

Jhuni, <jhuni_x@yahoo.com>

=head1 COPYRIGHT

GNU General Public License v2.0

*/
