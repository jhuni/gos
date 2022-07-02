CKIT.Utils.Base.assign('sudoko.model.solver.solve', function(grid) {
	
	// Initialize Abbreviations:
	var ci = CKIT.Iter;
	var cg = CKIT.Conditions.General;
	var cms = CKIT.Sequence;
	
	// The ranks are rows, columns, and 3x3 blocks.
	var blockSize = new tbsize(3,3);
	var allRanks = new CKIT.List( [].concat(  grid.getAllBlocks(blockSize), grid.getAllXRanks(), grid.getAllYRanks()  ) );
	var uptoNine = cms.upto(9);
	
	// options is an array of ones and zeros:
	var options = new Grid(  cms.upto(81).map( function(i) { 
		var rval = new CKIT.BitList(9);
		rval.setEveryValueTo(1); 
		return rval; 
	} ), new tbsize(9,9)  );
	
	grid.setIndex = function(index, value) {
		this.v[index] = value;
		
		if( value != 0 ) {
			// This particular index cannot have any other value
			options.getIndex(index).setEveryValueTo(0);
			
			// The other indexes in the row, column, and block of 
			// this index cannot have any other value.
			
			/* get the row, column, and block, and then
			for each cell in the row, column, and block
			eliminate value
			*/
			
		}
		
	};
	
	// Eliminate the impossibilities in the Start Grid:
	grid.setValuesToList(grid);
	
	while( 1 ) {
		
		/*********************************************************
		  Check For Wins Method:
		  What this method does is it essentially checks to make
		  sure none of the array is equal to zero.
		 *********************************************************/
		
		if( grid.isEqualTo(0).none() ) {  
			break; 
		}
		
		
		/*********************************************************
		  Reduce Ranks Method:
		  This method merely removes duplicates in ranks. For example
		  if a row has a one then there cannot be a one anywhere else 
		  in the row.
		 *********************************************************/
		 
		allRanks.forEach( function(coordMap) {
			
			// REQUIRE JAVASCRIPT 1.6
			var rankNums = coordMap.getGridValues(grid).filter(  cg.not(cg.isEqualTo(0))  );
			
			coordMap.forEach( function(cd) {
				var coordPossibilities = options.get(cd);
				
				ci.array(rankNums).forEach( function(cellNumber) {
					coordPossibilities.setIndex( cellNumber - 1, 0 );
				});
			});
					
		});


		
		
		var foundOne = false;
		
		/*********************************************************
		 Naked Singles Method: 
		 For all the options if there is only one (1) value 
		 then that is the only option so set the grid to
		 whatever that one value is.
		 *********************************************************/
		 
		cms.upto(81).forEach( function(i) {
			var optionMap = options.getIndex(i);
			
			// Only one option equals one (in other words true)
			if( optionMap.isEqualTo(1).one() ) {
				grid.setIndex(i, optionMap.firstIndex(cg.isEqualTo(1))+1 );
				foundOne = true;
			}
			
		});
		
		if( foundOne ) { continue; }

		
		/*********************************************************
		 Hidden Singles Method: 
		 This method works by basically looking through an entire
		 rank and looking through each of the squares for possibilities
		 that occur only once. We are given 9 possibilites per square
		 and 9 values per rank, so we are presented with something
		 similar to the following: 
		 
		     [1, 2, 3, 4, 5, 6, 7, 8, 9]
		 [1]  0  1  0  0  0  1  0  1  1
		 [2]  0  1  0  0  0  0  1  1  1
		 [3]  1  0  0  0  0  1  1  1  0
		 [4]  0  0  0  0  0  0  0  0  0
		 [5]  1  0  0  1  0  0  0  0  0
		 [6]  1  0  0  0  0  0  1  0  1
		 [7]  0  1  0  0  0  1  1  1  0
		 [8]  0  0  0  0  0  0  0  0  0
		 [9]  0  1  0  0  0  1  1  1  0
		 
		 Y-Axis: Numbers in Sudoko Grid
		 X-Axis: Index in Rank's Coordinates
		 
		  Ok so looking here we can see a grid that is 9x9 that corressponds
		  to the options in the coordmap of a rank. Along the y axis
		  what we are seeing is the possibilities that can be that number
		  for example in the '4' section there is only one one
		  and that means we are seeing a hidden single. The x axis
		  is which coordinate we are looking at in the coordinate map.
		 
		 *********************************************************/
		 
		allRanks.forEach( function(coordMap) {
			
			// This is a Grid object so it has a width and height: 9x9
			var myarray = [];
			coordMap.forEach( function(cd) {
				myarray.push( options.get(cd).toArray() );
			});
			
			var rankOptions = Grid.fromMultiArray(myarray); 
			
			uptoNine.forEach( function(cellNum) {
				if( foundOne ) { return;}
				
				// getYRank returns a CoordMap.
				var yrank = rankOptions.getYRank(cellNum).getGridValues(rankOptions);
				
				if( ci.array(yrank).condition(cg.isEqualTo(1)).one()  ) {
					var cd = coordMap.getIndex( yrank.indexOf(1) );
					var index = cd.toIndex(grid.size.width);
					grid.setIndex(index,cellNum+1);
					foundOne = true;
				}
				
			});
			
		});
		
		// If we find nothing:
		if( !foundOne ) {
			alert("No: Solution");
			return grid;	
		}
	
	}
		


	return grid;
}  );





/*

=head1 NAME

sudoko.model.solver.solve - a javascript function that solves sudoko.

=head1 SYNOPSIS

var solvedPosition = sudoko.model.solver.solve(new Grid( [
	7,9,0,  0,0,0,  3,0,0,
	0,0,0,  0,0,6,  9,0,0,
	8,0,0,  0,3,0,  0,7,6,
	
	0,0,0,  0,0,5,  0,0,2,
	0,0,5,  4,1,8,  7,0,0,
	4,0,0,  7,0,0,  0,0,0,
	
	6,1,0,  0,9,0,  0,0,8,
	0,0,2,  3,0,0,  0,0,0,
	0,0,9,  0,0,0,  0,5,4
], new tbsize(9,9) )    );

=head1 DESCRIPTION

This package is actually a single function solve() which returns
a solved sudoko grid from an unsolved one. This will
output a grid such that it has no zeros in it.

=head1 AUTHOR

Jhuni, <jhuni_x@yahoo.com>

=head1 COPYRIGHT

GNU General Public License

*/
