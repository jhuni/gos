Joose.Class('checkers.controller.main', {

	constructor: function(view) {
		// Handle arguments:
		this.view = view;
		
		// Onload:
		this.appname = 'checkers';
		this.size = this.view.size;
		this.selection = -1;
		this.pos = new checkers.model.position(Grid.fromRepetition(0,this.size),1);	
		
		var view = this.view;
		this.pos.board.setIndex = function(index,value){
			this.v[index] = value;
			view.setIndex(index,value);
		};
		
		this.focusCoord = new coord(0,0);
		
	},
	
	has: {
		view: {}
	},
	
	methods: {
		
		init: function() {
		
			this.pos.setToStart();
			
			var self = this;
			this.view.attachEvents(function(index){
				self.clickIndex(index);
			});
		
		},

		resize: function(newGeometry) {
		
			this.view.geometry = newGeometry;
			this.view.Onload();
			this.view.redisplay();
			this.pos.board.setValuesToList(this.pos.board);
			
		},

		menuClick: function(path) {
			
			if( path == 'File/New' ) {
				this.pos.setToStart();
			} else if( path == 'Help/About' ) {
				alert("Checkers application made by Jhuni.");
			}
			
		},
		
		keypress: function(e) {
			
			if( e.key === 'space' ) {
				this.clickIndex(this.focusCoord.toIndex(this.size.width));
				this.view.focusCoord(this.focusCoord);
				return;
			}
			
			var cd = this.focusCoord;
			this.view.resetCoord(cd);
			
			if( e.key === 'right' ) {
				cd.addCoord(new coord(1,0));	
			} else if( e.key === 'down' ) {
				cd.addCoord(new coord(0,1));
			} else if( e.key === 'up' ) {
				cd.addCoord(new coord(0,-1));
			} else if( e.key === 'left' ) {
				cd.addCoord(new coord(-1,0));
			}
			
			if( cd.x < 0 ) {
				cd.x += this.size.height;
			}
			
			if( cd.y < 0 ) {
				cd.y += this.size.height;
			}
			
			if( cd.x >= this.size.width ) {
				cd.x -= this.size.width;
			}
			
			if( cd.y >= this.size.height ) {
				cd.y -= this.size.height;
			}
			
			this.view.focusCoord(cd);
			
		},

		clickIndex: function(myindex) {
			
			var sz = this.pos.board.size;
			var plyr = this.pos.playerToMove;
		
			var clickedCoord = coord.fromIndex(myindex, sz);
			var move = new Shape.LineSegment(coord.fromIndex(this.selection,sz), clickedCoord);
			
			// If we are dealing with a piece that is owned by the current player.
			if( this.pos.isOwnedBy( plyr, this.pos.board.get(clickedCoord) ) ) {
				
				// Click on the highlighted piece.
				if( this.selection == myindex ) {	
					this.view.normalizeCell(myindex);
					this.selection = -1;
					
				// Click on a piece owned by the player to move that isn't higlighted.
				} else {
					if( this.selection !== -1 ) {
						this.view.normalizeCell(this.selection);
					}
					
					this.view.highlightCell(myindex);	
					this.selection = myindex;
				}
				
			// If we are dealing with a piece that is not owned by the current player.
			// At the same time there must be something selected.
			} else if( this.selection !== -1 && this.pos.isPossibleMove(move) ) {
			
				// Time to start moving:
				this.view.normalizeCell(this.selection);
				this.pos.moveCell(move, this.pos.board.get(move.start) );
				
				if( this.pos.lastJump === -1 ) {
					this.selection = -1;
					this.pos.toggleTurns();
				} else {
					this.pos.clearLastJump();
					
					if( this.pos.canJump() ) {
						this.selection = myindex;
						this.view.highlightCell(myindex);
					} else {
						this.selection = -1;
						this.pos.toggleTurns();
					}
				}
				
			}
			
			
		}
			
	}

});



CKIT.Utils.Base.assign('checkers.controller.main.menu', [

	{text:'File', children: [
		{text: 'New'}	
	]},
	
	{text:'Help', children: [
		{text: 'About'}
	]}

]);




/*

=head1 NAME

checkers.controller.main - an interface to the checkers application, usually requires a view.

=head1 SYNOPSIS

=head1 DESCRIPTION

=head1 CONSTRUCTOR

=head1 METHODS

=head1 AUTHOR

Jhuni <jhuni_x@yahoo.com>

=head1 COPYRIGHT

GNU General Public license.
(a copy of the license should have been shipped with this program).

*/
