JSAN.use('QEvent');

CKIT.Class.assign('gnometris.controller.main', {
	
	Has: ['view', 'size', 'interval'],
	
	Onload: function() {
		this.appname = 'gnometris';
		this.timeout = 0;
		
		this.gs = new gnometris.model.gamestate(this.size);	
		
		var view = this.view;
		this.gs.pos.setIndex = function(index,value) {
			this.v[index] = value;
			view.setIndex(index,value);
		};
		
		this.lines = 0;
		this.score = 0;
		this.level = 0;
		
	},

	init: function() {

		// Start a tetromino:
		this.placeTetromino();
		
	},
	
	menuClick: function(path) {
		
		switch(path) {
			
			case 'Help/About':
			
				alert("HI");
				break;	
		
		}
		
	},
	
	/* Press a key: */
	keypress: function(e) {
	
		if( e.key === 'left' ) {
			this.onInt(new coord(-1,0));
		} else if( e.key === 'right' ) {
			this.onInt(new coord(1,0) );	
		} else if( e.key === 'down' ) {
			this.onInt(new coord(0,1) );	
		} else if( e.key === 'up' ) {
			this.rotateActiveCoords();
		} else if( e.key === 'space' ) {
			
		}
		
	},

	resize: function(newGeometry) {
		this.view.geometry = newGeometry;
		this.view.Onload();
		this.view.redisplay();
		
		this.gs.pos.setValuesToList(this.gs.pos);
	},

	increaseScoreBoard: function(lineCount) {
	
		// Increase score:
		this.score += this.getScoreFromLines(this.lines);
		this.lines += lineCount;
		
		// Now check for the level situation:
		if( Math.floor(this.lines / 2) >= this.level) {
			this.level++;
			this.onLevelUp();
		}
		
		this.view.setScoreLabel('score', this.score );
		this.view.setScoreLabel('lines', this.lines);
		this.view.setScoreLabel('level', this.level);
		
		
	},
	
	onLevelUp: function() {
		this.interval -= 50;
	},

	getScoreFromLines: function(lines) {
		var score;
		
		if( lines == 1 ) {
			score = 40;
		} else if( lines == 2 ) {
			score = 100;	
		} else if( lines == 3 ) {
			score = 300;	
		} else {
			score = lines * 300;
		}
		
		return score;
	},


	
	
	
	
	

	rotateActiveCoords: function() {
		
		this.gs.clearActiveCoords();
		this.currentShape.exchangeXY().reverseX();
		this.gs.setupShape(this.gs.epicenter, this.currentShape, this.gs.activeValue);
		this.gs.placeActiveCoords();
		
	},

	// Returns isOnBottomLevel
	onInt: function(coordinate) {
		var isOnBottom = this.gs.moveActiveCoords(coordinate);
		
		Grid.prototype.moveDownY = function(sz) {
			
			var cloned = this.byval();
			
			var self = this;
			sz.loopGrid( function(cd) {
				
				var oy = ( cd.y-1 >= 0 ) ? cd.y-1 : sz.height-cd.y-1;
				self.set(  cd, cloned.get(new coord(cd.x,oy))  );
				
			});
			
			return this;
		};
	
		if( isOnBottom ) {
			
			var xpoint = this.gs.pos.size.height-1;
			while(xpoint != 0) {
				var cdmap = this.gs.pos.getXRank(xpoint);
				var xrank = new CKIT.List( cdmap.getGridValues(this.gs.pos) );
				
				if( xrank.isEqualTo(-1).none() ) {
					var self = this;
					cdmap.forEach( function(cd) {
						self.gs.pos.set(cd,-1);
					});
					this.gs.pos.moveDownY(new tbsize(this.gs.pos.size.width,xpoint+1));
					this.increaseScoreBoard(1);
				} else {
					xpoint--;	
				}
			}
			
			this.placeTetromino();
			
		}
	
	},

	placeTetromino: function() {
		
		this.gs.epicenter = new coord(3,0);
		this.gs.activeValue = Math.floor(Math.random()*gnometris.model.shapes.elems);
		this.currentShape = gnometris.model.shapes.getIndex(this.gs.activeValue).byval();
		
		var isValid = this.gs.setupShape(this.gs.epicenter, this.currentShape, this.gs.activeValue);
		
		if( !isValid ) {
			alert("Game Over: you have lost");
			this.pause();
			return;
		}
		
		this.gs.placeActiveCoords(this.gs.activeValue);
		
		var self = this;
		if( this.timeout === 0 ) {
			this.timeout = setInterval( function(){
				self.onInt(new coord(0,1));
			}, this.interval);
		}
		
	},

	pause: function() {

		window.clearTimeout(this.timeout);
		
	},
	
	onLose: function() {
		alert('lose!');	
	}



});



CKIT.Utils.Base.assign('gnometris.controller.main.menu', [

	{text:'Help', children:[
		{text:'About'}
	]}

]);
