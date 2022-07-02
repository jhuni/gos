(function(){
	
JSAN.use('Lang.Utils');
JSAN.use('Grid.CoordMap');
JSAN.use('Grid.Directions');

var createCoordMap = function(grid, startCoord, direction) {
	
	var rval = [];
	var s = tbsize.fromMultiArray(grid);
	
	var currentCoord = startCoord.byval();
	while(1) {
		
		rval[rval.length] = currentCoord.byval();
		
		currentCoord.addCoord(direction);
		if( !s.containsCoord(currentCoord) ) {
			return new Grid.CoordMap(rval);	
		}
			
	}
	
};

Lang.Utils.makeNamespace('Grid.Rank');

Grid.Rank = function(coords, values) {
	
	this.coords = coords;
	this.values = values;
	
};

/* Public Methods */
Lang.Utils.mixin(Grid.Rank, { 

getRow: function(myarray, row) {
	return( createCoordMap(myarray, new coord(0,row), Grid.Directions.e ) );
},

getColumn: function(myarray, col) {
	return( createCoordMap(myarray, new coord(col,0), Grid.Directions.s ) );	
},

getDiagonal: function(myarray, diagonal, isPositive) {
	
	var s = tbsize.fromMultiArray(myarray);

	// The direction to go in:
	var direction = isPositive ? new coord(-1,1): new coord(1,1);
	
	// My coordinate: starts the diagonal.
	var mcd = this.getDiagonalStart(s.width-1, s.height-1, diagonal, isPositive);
	
	return( createCoordMap(myarray, mcd, direction) );
	
},

getAllRows: function(myarray) {
	
	var s = tbsize.fromMultiArray(myarray);
	var rval = [];
	for( i = 0; i < s.height; i++ ) {
		rval[i] = this.getRow(myarray, i);	
	}
	return rval;
	
},

getAllColumns: function(myarray) {
	
	var s = tbsize.fromMultiArray(myarray);
	var rval = [];
	for( i = 0; i < s.width; i++ ) {
		rval[i] = this.getColumn(myarray, i);	
	}
	return rval;
	
},

getAllRanks: function(myarray) {
	
	// Prefixes ('p','n') mean positive and negative.
	var allranks = {
		rows:         this.getAllRows(myarray),
		cols:         this.getAllColumns(myarray),
		pdiagonals:   [],
		ndiagonals:   []
	};
	
	//var diagonalCount = (this.length*2)-1;
	for( var i = 0; i < 5; i++ ) {
		allranks.pdiagonals[i] = this.getDiagonal(myarray, i, true);
		allranks.ndiagonals[i] = this.getDiagonal(myarray, i, false);
	}
	
	return allranks;

},

getRankNumbers: function(width, height, coordinate) {
	width--; height--;
	//			      row  column pdiagonal ndiagonal
	var myvalues = [   0,    0,      0,        0    ];
	myvalues[0] = coordinate.x;
	myvalues[1] = coordinate.y;
	myvalues[2] = this.fromDiagonalStart(width, height, coordinate, true );
	myvalues[3] = this.fromDiagonalStart(width, height, coordinate, false );
	return myvalues;
	
},



/* Utility Routines */

loopDirection: function(myarray, mycoord, direction, func) {

	var s = tbsize.fromMultiArray(myarray);
	var i = 0;
	
	while(1) {
		
		func(mycoord);
	
		mycoord.addCoord(direction);
	
		if( s.containsCoord(mycoord) ) {
			break;
		}
	
		i++;
		
	}
	
},

reduceCoord: function(mycoord, direction, width, height) {
	
	var s = new tbsize(width,height);
	var cdbv = mycoord.byval(); // coordinate by value
	
	while(1) {
		
		cdbv.addCoord(direction);
		
		if( s.containsCoord(cbdv) ) {
			cdbv.addCoord(direction.inverse());
			return cdbv;	
		}
	
	}
	
},

getDiagonalStart: function(width, height, index, reverse) {
	
	if( (index) <= width ) {
		var x = width-index;
		if( reverse === true ) {
			x = width-x;
		}
		
		return new coord(x, 0);
	} else {
		x = 0;
		if( reverse === true ) {
			x = width-x;
		}
		
		return new coord(x, index-width);
	}
	
},

fromDiagonalStart: function(width, height, cd, reverse) {
	
	var x = (reverse) ? cd.x : width-cd.x;
	return( x + cd.y );
	
}


}); // End OBJ

/* Private Methods */


})();










/*

=head1 NAME

Grid.Rank - utilities for dealing with ranks in arrays.

=head1 SYNOPSIS

	var simpleArray = [
	[1,2,3],
	[4,5,6],
	[7,8,9]
	];

	var myrank = Grid.Rank.getRow(simpleArray,1);
	alert(myrank.values);
	alert(myrank.coords);

=head1 DESCRIPTION

This is a module for dealing with ranks. A rank is a row
a column a diagonal or anything which is a line along a Grids
coordinates. This module has all the essential utilities
for dealing with this by allowing you to get a row,column,diagonal,
or get it from a coord object. It also allows you to calculate all
of them automatically with getAllRanks() so that you can cache
them if you are doing complex calculations.

=head1 CONSTRUCTOR

The constructor for a grid object takes two things: the values and the coords. 
The order in the constructor is (values[], coords[]).

=head2 values[]

This returns an Array of all the values in the rank so that you can 
use this in a condition or something similar.

=head2 coords[]

This is an array of all of the values in the Array so that after you calculated
it you can affect all the values in the array by using Array.forEach or something
similar.

=head1 PUBLIC FUNCTIONS

=head2 getRow(array, row)

Takes an Array and outputs the associated Grid object with the row. A row starts
at zero and ends at the height of the Grid. Here is a Grid in terms of rows:

	[1,2,3]  // Row 0
	[4,5,6]  // Row 1
	[7,8,9]  // Row 2
	
So as an example you can do the following in your code

	var myarray = [[1,2,3],[4,5,6],[7,8,9]];
	Grid.Rank.getRow(myarray,1) // Returns values[4,5,6]

=head2 getColumn(array, col)

This is similar to getRow except it goes along the y axis instead of the x axis
in the case of rows. Here is how it works:

					//  Columns:
	var myarray = [ //  0     1      2 
					//-------------------
					   [1,    2,     3]
					   [4,    5,     6]
					   [7,    8,     9]
				  ];
				  
	Grid.Rank.getColumn(myarray,2) // Returns values[3,6,9]

=head2 getDiagonal(array, diagonal, isPositive)

This takes an array and the diagonal is how far it is from the center
and then isPositive is illustrated by the following diagram:

	[[1,0,0]
	 [0,1,0]     // This is a negative diagonal
	 [0,0,1]]
	 
	[[0,0,1]
	 [0,1,0]    // This is a positive diagonal
	 [1,0,0]]
	 
The values in accordance with isPositive can be remembered by the fact
that they work in accordance with slopes along a graph. That is assuming
the top right corner is positive which it generally is considered to be.
Anyways here is an example of the API:

	var myarray = [  [1,2,3],
				     [4,5,6],
				     [7,8,9]  ];
	
	Grid.Rank.getDiagonal(myarray, 0, false); // Returns values[1,5,9]
	Grid.Rank.getDiagonal(myarray, 0, true ); // Returns values[3,5,7]
	

=head2 getAllRanks(array)

This function takes an Array and calculates all the rows available in
the height and all of them available in the height and then it calculates
automatically how many diagonals it can make and then it gets them together
in an object of the sort of the following:

	var allranks = {
		rows: [],
		cols: [],
		pdiagonals: [],
		ndiagonals: []
	};
	
This object can then have its values accessed by array indexing. The point
of this is that it can greatly increase performance to cache all of them
if you are doing a complex operation like a game engine or something similar.

=head2 getFromCoord(array, coordinate)

Takes a coordinate and then gets the the row, column, positive diagonal,
and negative diagonal associated with that coordinate.

	//			      row  column pdiagonal ndiagonal
	var myvalues = [   0,    0,      0,        0    ];

The first is the row then the column then positive then negative.

=head1 UTILITY ROUTINES

=head2 loopDirection(myarray, coord, direction, func)

Takes an array and performs a function all of its coordinates
along a direction from a startpoint.

=head2 reduceCoord(coord, direction, width, height)

Takes a coordinate and reduces it along a direction to the closest
to the bound it can possibly get. The point is that you can then 
loop in the opposite direction and get the entire diagonal.

=head2 getDiagonalStart(width, height, index, reverse)

Gets the startpoint of a diagonal from the index of the
diagonal and rather or not to reverse.

=head2 fromDiagonalStart(width, height, cd, reverse)

This takes a diagonal startpoint which is a coordinate
and instead it goes through and returns the diagonal value.

=head1 AUTHOR

Jhuni <jhuni_x@yahoo.com>

=head1 COPYRIGHT

GNU General Public License.

*/
