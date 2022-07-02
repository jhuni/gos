JSAN.use('QEvent');

Joose.Class('chess.controller.main', {
	
	constructor: function(view) {
		this.view = view;
		this.Onload();
	},
	
	has: {
		view: {}
	},
	
	methods: {
		
		Onload: function() {
			this.appname = 'chess';
			this.selection = -1;
			this.size = this.view.size;
			
			this.gamestate = new chess.model.gamestate(new Grid([
				-4,-2,-3,-6, -5,-3,-2,-4,
				-1,-1,-1,-1, -1,-1,-1,-1,
				 0, 0, 0, 0,  0, 0, 0, 0,
				 0, 0, 0, 0,  0, 0, 0, 0,
				 
				 0, 0, 0, 0,  0, 0, 0, 0,
				 0, 0, 0, 0,  0, 0, 0, 0,
				 1, 1, 1, 1,  1, 1, 1, 1,
				 4, 2, 3, 6,  5, 3, 2, 4
			], new tbsize(8,8) ), 'white');
			
			var view = this.view;
			this.gamestate.pos.setIndex = function(index, value) {
				this.v[index] = value;
				view.setIndex(index,value);
			};
			
			this.focusCoord = new coord(0,0);
			
		},
		
		init: function() {
			this.gamestate.pos.setValuesToList(this.gamestate.pos);
		
			var self = this;
			this.view.attachEvents(function(cd) {
				self.clickCoord(cd);
			});
			
		},
		
		menuClick: function(path) {
			
			if( path === 'File/New' ) {
				
			} else if( path === 'Help/About' ) {
				alert("Chess program made by Jhuni");
			}
			
		},
		
		keypress: function(e) {
			
			if( e.key === 'space' ) {
				this.clickCoord(this.focusCoord);
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
		
		resize: function(newGeometry) {
			this.view.geometry = newGeometry;
			this.view.Onload();
			this.view.redisplay();
			
			this.gamestate.pos.setValuesToList(this.gamestate.pos);
		},
		
		clickCoord: function(cd) {
			
			var value = this.gamestate.pos.get(cd);
			
			if( this.gamestate.getCoordColor(cd) === this.gamestate.turn ) {
				if( this.selection === -1 ) {
					this.view.highlightCoord(cd, this.gamestate.pos.get(cd) );
					this.selection = cd.byval();
				} else {
					if( this.selection.x == cd.x && this.selection.y == cd.y ) {
						this.gamestate.pos.set(this.selection, this.gamestate.pos.get(this.selection));
						this.selection = -1;
					} else {
						this.gamestate.pos.set(this.selection, this.gamestate.pos.get(this.selection));
						this.view.highlightCoord(cd, this.gamestate.pos.get(cd) );
						this.selection = cd.byval();
					}
				}
			} else if( this.selection != -1 ) {

				var move = new Shape.LineSegment(this.selection, cd);
				
				if( this.gamestate.isValidMove(move) ) {	
					if( move.type === 'normal' ) {	
							
						var selectedValue = this.gamestate.pos.get(this.selection);
						this.gamestate.pos.set(move.start, 0);
						this.gamestate.pos.set(move.end,   selectedValue);
			
					} else if( move.type === 'promotion' ) {
						
						this.gamestate.pos.set(move.start,0);
						var val = prompt("Promote to one of: queen, knight, bishop, rook");
						var assoc = {'queen': 6, 'knight': 2, 'bishop': 3, 'rook': 4};
						
						if(typeof assoc[val] != 'undefined' ) {
							this.gamestate.pos.set(move.end,assoc[val]*this.gamestate.turnModifier);
						} else {
							this.gamestate.pos.set(move.end,6*this.gamestate.turnModifier);
						}
						

					} else if( move.type === 'en passant' ) {
						
						this.gamestate.pos.set(move.start,0);
						this.gamestate.pos.set(move.end,this.gamestate.turnModifier);
						this.gamestate.pos.set(new coord(move.end.x,move.end.y+this.gamestate.turnModifier),0);
						
					} else if( move.type === 'castle' ) {
						
						this.gamestate.pos.set(move.start,0);
						this.gamestate.pos.set(move.end,5*this.gamestate.turnModifier);
						
						var isKingSide = (move.getDistCoord().x > 0);
						var rooky = ( this.gamestate.turn == 'white' ) ? 7 : 0;
						
						this.gamestate.pos.set(new coord(isKingSide ? 7 : 0,rooky),0);
						this.gamestate.pos.set(new coord(isKingSide ? 5 : 3,rooky),4*this.gamestate.turnModifier);
						
					}
					
					this.selection = -1;
					this.gamestate.toggleTurns();
				}
				
			}
			
		}
		
	}
	
});


CKIT.Utils.Base.assign('chess.controller.main.menu', [
	{text:'File', children: [
		{text: 'New'}	
	]},
	
	{text:'Help', children: [
		{text: 'About'}
	]}
]);
