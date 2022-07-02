// Class tictactoe.gamedata.ai

/* Takes gamedata and returns a coordinate */

CKIT.Class.assign('tictactoe.model.gamedata.ai', {
	
	Has: ['cells', 'turn', 'connections'],
	
	Extends: [tictactoe.model.gamedata],
	
	Onload: function() {
		this.turnNumber = 1;	
	
		// allRanks:	
		this.xranks = this.cells.getAllXRanks();
		this.yranks = this.cells.getAllYRanks();
		this.allRanks = [].concat(this.xranks,this.yranks);
		this.allRanks.push(  this.cells.createCoordMap(new coord(0,0), new coord(1,1))  );
		this.allRanks.push(  this.cells.createCoordMap(new coord(2,0), new coord(-1,1)) );
	
	},
	
	evaluateAllegiance: function(values) {
		
		var rval = {allies: 0, enemies: 0};
		
		for( var i = 0, l = values.length; i < l; i++ ) {
			if( values[i] === this.turn ) {
				rval.allies++;
			} else if( values[i] !== 0 ) {
				rval.enemies++;
			}
		}
		
		return rval;
		
	},
	
	evaluatePosition: function(position) {
		
		var rval = 0;

		for( var i = 0, l = this.allRanks.length; i < l; i++ ) {
			var values = this.allRanks[i].getGridValues(position);
			var allegiance = this.evaluateAllegiance(values);
			
			if( allegiance.allies > 0 && allegiance.enemies > 0 ) {
				continue;
			} else if( allegiance.allies == this.connections ) {
				return 1;	
			}
			
			if( allegiance.enemies == (this.connections-1) ) {
				rval = -1;
			}
			
			if( rval != -1 ) {
				if( allegiance.enemies > 0 ) {
					rval -= allegiance.enemies/30;
				} else if( allegiance.allies > 0) {
					rval += allegiance.allies/30;
				}
			}
			
		}
		
		return rval;
		
	},
	
	// Returns a coordinate
	move: function(level) {
		
		var weights = new CKIT.NumList([0,0,0, 0,0,0, 0,0,0]);
		
		for( var i = 0, j = this.cells.elems; i < j; i++ ) {
			if( this.cells.getIndex(i) !== 0 ) {
				// -2 means no move is possible there:
				weights.setIndex(i, -2);
			} else {
				var possiblePosition = this.cells.byval();
				possiblePosition.setIndex(i,this.turn);
				
				// evaulate the position:
				weights.setIndex(i, this.evaluatePosition(possiblePosition) );
			}
		}
		
		return coord.fromIndex( weights.maxIndex(), this.cells.size );
		
	}
	
	
});







	
/*

=head1 NAME

tictactoe.model.gamedata.ai - a computer that plays tictactoe.

=head1 SYNOPSIS

	var pos = new tictactoe.model.gamedata.ai(
	[  [0,0,0],
	   [2,2,1],
	   [0,0,1]   ],  1, 3);
	   
	var mymove = pos.move('5'); // Returns a move from the AI engine.

=head1 DESCRIPTION

This module is for one simple purpose - dealing with tictactoe 
positions in order to generate a coord based on a certain AI level.
This module only cares about a single function move() which takes
a level and returns a move. In addition, gamedata.ai inherits from gamedata.

=head1 METHODS

=head2 move(level)

This is the main method and it simply gets a move by the AI engine.

=head1 AUTHOR

Jhuni <jhuni_x@yahoo.com>

=head1 COPYRIGHT
GNU General Public license.
(a copy of the license should have been shipped with this program).
   
   

*/
