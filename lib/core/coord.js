/*jsan __header__ */

JSAN.use('CKIT');

/*jsan __end__ */

Joose.Class('coord', {
	
	constructor: function(x, y) {
		this.x = x;
		this.y = y;
	},
	
	has: {
		x: {},
		y: {}
	},
	
	methods: {
	
		addCoord: function() {
		
			var addend = (arguments.length==2) ? new coord(arguments[0],arguments[1]) : arguments[0];
			
			this.x += addend.x;
			this.y += addend.y;
			return this;
		},

		multiply: function(value) {
			this.x *= value;
			this.y *= value;
			return this;	
		},

		byval: function() {

			return( new coord(this.x, this.y) );
			
		},

		toString: function() {
			return this.x + "," + this.y;	
		},

		inverse: function() {
			return( new coord(0-this.x, 0-this.y) );	
		},

		toIndex: function( mywidth ) {
			
			return( (this.y * mywidth) + this.x);
			
		},

		switchXY: function() {
			var temp = this.y;
			this.y = this.x;
			this.x = temp;
			return this;
		}
		
	}
	
});

/** Internet Explorer: **/
coord.prototype.toString = function() {
	return this.x + "," + this.y;
};
/** End Internet Explorer Code **/


CKIT.Utils.Base.update(coord, {
	
	fromIndex: function(index,size) {
		
		var y = Math.floor(index/size.width);  // Which size.width are you in?
		var x = index % size.width;              // How far after size.width are you?
		
		return new coord(x,y);
		
	},

	fromString: function(str) {
		var places = str.split(/\s*,/);
		return new coord(  parseInt(places[0],10), parseInt(places[1],10)  );
	},

	sum: function(/*...*/) {
		
		var rval = new coord(0,0);
		
		for(var i = 0, j = arguments.length;   i < j; i++ ) {
			rval.addCoord(arguments[i]);
		}
		
		return rval;
		
	}
	
});




/*
coord.eq = function(c1,c2) {
	return( c1.x == c2.x && c1.y == c2.y );
};*/



/* 

=head1 NAME

coord - deal with coordinates

=head1 DESCRIPTION

This module deals with coordinates, particularily in respect to the coordinate
plane, in which case we use x and y coordinates to go through grids.

=head1 METHODS

=head2 addCoord(addend)

This method changes the current coordinate value by adding one the above value
to the current one.

=head2 checkbounds(xbound,ybound)

This method checks to see if this is within the specified grid.

=head2 byval()

Returns a new coordinate with the same value as this one. This is not a reference
rather it is a new instantiation.

=head2 toString()

This returns a comma ", " in between x and y eg: (2,3).toString() = "2, 3"

=head2 inverse()

Returns a new coordinate in the form (0-x, 0-y) such that you have negated
both the x and y values so you go to the opposite of the coordinate plane.

=head2 toIndex( width )

This uses the width of the grid to get where this coord is in it.

=head2 coord.fromIndex( index, size )

Gets a coordinate object from an index in a grid.

=head1 AUTHOR

Jhuni, <jhuni_x@yahoo.com>

=head1 COPYRIGHT

GNU General Public License v2.0

*/
