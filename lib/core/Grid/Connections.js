/*
 * This file is for checking the connections that occur along directions
 * and it returns an array of array variables.
 * Require: coords.js directions.js
 */

JSAN.use('Grid');
JSAN.use('Grid.Directions');


Grid.prototype.checkDirection = function(baseCoordinate, direction, conditional) {
	
	var tempBaseCoord = baseCoordinate.byval();
	var rval = [];
	
	while(1) {
		
		tempBaseCoord.addCoord(direction);
		
		if( !this.size.containsCoord(tempBaseCoord) || !conditional(this.get(tempBaseCoord)) ) {
			break;	
		}
		
		rval[rval.length] = tempBaseCoord.byval();
		
	}
	
	return rval;
};

// This checks rows, columns, and diagonals
Grid.prototype.checkForConnections = function(baseCoordinate, minimumSize, conditional) {
	
	var rval = [];
	var directions = Grid.Directions.neighbourMap.cds;
	
	if( !conditional(this.get(baseCoordinate)) ) {
		return [];	
	}
	
	for( var i = 0, j = directions.length; i < j; i += 2 ) {
		var firstChain = this.checkDirection(baseCoordinate,directions[i],conditional);
		var secondChain = this.checkDirection(baseCoordinate,directions[i+1],conditional);
		var fullChain = firstChain.concat([baseCoordinate], secondChain);
		
		if( fullChain.length >= minimumSize ) {
			rval[rval.length] = fullChain;
		}
		
	}
	
	return rval;
	
};




(function(){

CKIT.Utils.Base.assign('Grid.Connections', {});



Grid.Connections = function(grid, baseCoordinate, conditional) {
	
	this.grid = grid;
	this.baseCoordinate = baseCoordinate;
	this.gridSize = tbsize.fromMultiArray(this.grid);
	
	this.conditional = (typeof conditional === 'number') ? function(cell) {
		return( cell === conditional );
	} : conditional;
	
	
};



Grid.Connections.prototype = {

checkDirection: function(direction) {
	
	// Don't edit the baseCoordinate with the addCoord function.
	var tempBaseCoord = this.baseCoordinate.byval();
	var conformingCoords = [];  	// This is what you return.
	
	// Infinite Loop:
	while(1) {
		
		tempBaseCoord.addCoord(direction);
		
		// Break if the coordinate isn't in the Grid.
		if( !this.gridSize.containsCoord(tempBaseCoord) ) {
			break;
		}
		
		// Get the current cell value:
		var currentCellValue = this.grid[tempBaseCoord.y][tempBaseCoord.x];
		
		// Break if the check doesn't work out.
		if(  this.conditional(currentCellValue) !== true  ) { break; }
		
		conformingCoords.push(  tempBaseCoord.byval()  );
		
	}
	
	return conformingCoords;
	
},

checkDirections: function(/* Directions... */) {

	var rval = [];
	
	var j = arguments.length;
	for( var i = 0; i < j; i++ ) {
		rval = rval.concat( this.checkDirection(arguments[i]) );
	}
	
	return rval;
	
},

checkAllDirections: function(minimumSize) {

	var allDirections = Grid.Directions.neighbourMap.cds;
	
	var rval = [];
	var j = allDirections.length;
	
	for( var i = 0; i < j; i+=2 ) {
	
		var con = this.checkDirections(allDirections[i], allDirections[i+1]);
		
		if( (con.length + 1) >= minimumSize ) {
			rval = rval.concat(con);	
		}
		
	}
	
	rval = rval.concat(this.baseCoordinate);
	return rval;
	
}




}; // End prototype

})();




/*

=head1 NAME

Grid.Connections - check a Grid coordinate for surrounding connections

=head1 DESCRIPTION

In the case of Tictactoe you want to check if from a single coordinate
there is a large amount of connections based on a single conditional
supplied as a function that takes a table cell. If there is a group
equal to that cell of a minimum size then the game is over. This module
allows you to do that with ease.

=head1 CONSTRUCTOR
The constructor takes arguments in the order of (grid, baseCoordinate, conditional)

Usage:

	// This is for a tictactoe game. 0 is blank, 1 is a color, 2 is opposing color.
	var gc = new Grid.Connections([0,0,0],
								  [1,1,1],
								  [0,0,0],  new coord(0,1),  1);
	// This will go from the coordinate (0,1) and it will go through a 
	// direction as long as all the values in the direction are equal to the value 1.
	// you could supply the value 1 or you could make the function yourself.

=head2 grid

This is a value for the Grid that is currently getting affected by the connection
checker. 

=head2 baseCoordinate

The base coordinate is that coordinate from which all of the checking shall occur.
Eg if I have a tictactoe game you put the coordinate the user just moved to in
this value and then your conditional will probably be return true if it is the
same color as the moved piece.

=head2 conditional

A conditional is any sort of function which returns either true or false. In this
case you can apply a number in the conditional and it will automatically generate
a conditional for you in the form of:
	
	function(val){
		if   ( val == conditional )   { return true;	} 
		else                          { return false; } 
	}
	
=head1 METHODS

=head2 checkDirection(direction)

This is a simple method that is applied in accordance with the constructors members.
This does not add on the baseCoordinate that is given to the constructor!

Usage: 
	
	this.checkDirection(Grid.Directions.e);
	// This just goes through that direction based on the conditional of the constructor.


=head2 checkDirections(...)

This concatenates an array using checkDirection on all the arguments that are given
to the function. Notably this does not add on the baseCoordinate that is given
to the constructor. Here is an example usage:

Usage:

	this.checkDirections(Grid.Directions.e, Grid.Directions.w);
	// Checks both east and west and gets the coordinates in a line.


=head2 checkAllDirections(minimumSize)

This goes through and checks all of the directions in Grid.Directions.neighbourMap,
which means north,south,east,west,northeast, etc. Then after doing so it returns an
array of the values that meet the specified conditions.

Usage:

	var myposition = [[0,1,0,0]
					  [1,1,1,1]
					  [0,1,0,0]
					  [0,0,0,0]];
					  
	var gc = new Grid.Connections(myposition, new coord(1,1), 1);
	
	gc.checkAllDirections(3)
	// This returns all the coordinates in the Grid that are ones
	
	gc.checkAllDirections(4)
	// This only returns the second row as that row is the only
	// line in which has a length that is greater then or equal to four.
	
	gc.checkAllDirections(5)
	// This will return the coordinate you started with or (1,1).
	// The function allways appends that at the end.
					  

*/
