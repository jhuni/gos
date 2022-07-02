(function() {
var gds = Grid.Directions;
	
CKIT.Class.assign('minesweeper.controller.main', {
	
	Has: ['view', 'minecount', 'useFlagQuestion', 'useFlagWarnings', 'cwd'],
	
	Onload: function() {
		// Take this from the view:
		this.appname = 'minesweeper';
		this.size = this.view.size;
		
		this.gamestate = new minesweeper.model.gamestate();
		
		this.randomizeFields();
		
		this.focusCoord = new coord(0,0);
		this.selectedCoords = [];
		
	},
	
	init: function() {
		this.view.attachEvents(this);	
	},
	
	resize: function(newGeometry) {
		this.view.geometry = newGeometry;
		this.view.Onload();
		this.view.redisplay();
		this.gamestate.pos.setValuesToList(this.gamestate.pos);
		this.init();
	},

	menuClick: function(path) {
		
		switch( path ) {
			case "File/New":
				this.newGame();
				break;
			case "File/Quit":
				this.gamestate.pos.shuffle();
				break;
			case "File/Save":
				minesweeper.model.gamestate.instances['store'] = {
					pos: this.gamestate.pos, 
					field: this.gamestate.field
				};
				break;
			case "File/Open":
				var gs = minesweeper.model.gamestate;
				var data = gs.create( gs.instances['store'] );
				data.createSurroundField();
				
				this.view.redisplay();
				this.gamestate.pos.setValuesToList(data.pos);
				
				break;
			case "Help/About":
				alert('This is a program made for the GoldOS project!');
				break;
		}
		
	},
	
	keypress: function(e) {
		
		if( e.key === 'f' ) {
			this.gamestate.pos.set(this.focusCoord, 2);
		} else if( e.key === 'q' ) {
			this.gamestate.pos.set(this.focusCoord, 3);
		} else if( e.key == 'space' ) {
			this.cellClick(this.focusCoord);
		} else {
		
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
		
		}
		
	},

	// This occurs after a cell click if the game was not lost.
	setupElement: function( cd ) {

		this.gamestate.pos.set(cd,1);

		// The amount of surrounding mines
		var minecount = this.gamestate.sfield.get(cd);

		if( minecount === 0 ) {
			
			// If the minecount is zero then you basically
			// click on all the surrounding squares of the cd
			var self = this;
			var ps = this.gamestate.pos;
			
			gds.neighbourMap.surroundCoord( cd, this.size, function(cd) {
				
				if( ps.get(cd) === 0 ) {
					self.setupElement( cd );
				}
				
			} ); 
				
		}
		
		if ( this.gamestate.isWon() ) {  
			this.winGame(); 
		}

	},

	// This event occurs whenver you right click down on a square and said square
	// is a cell that is already visible.
	onCellClear: function(cd) {
		
		var self = this;
		gds.neighbourMap.surroundCoord( cd, this.size, function(cd) {
			
			if( self.gamestate.pos.get(cd) == 0 ) {
				self.cellClick( cd );
			}
			
		} );
		
	},



	randomizeFields: function() {
		
		// Reference the model:
		var model = minesweeper.model.minefield;
		this.gamestate.field  =   model.generate(this.size, this.minecount);
		this.gamestate.pos    =   new Grid(CKIT.Iter.repeat(0,this.size.area()).toArray(), this.size);
		this.gamestate.createSurroundField();
		
		var view = this.view;
		var sfield = this.gamestate.sfield;
		this.view.sfield = sfield;
		
		/* Override the setIndex function */
		this.gamestate.pos.setIndex = function(index,value) {
			this.v[index] = value;
			view.setIndex(index,value);
		};
		
		
		
	},

	/*
	States:
	face_sad, face_win, face_smile, face_worried, face_cool

	*/

	setState: function(setting) {
		this.view.setState(setting);
	},

	winGame: function() {

		this.setState("face-win");

	},

	newGame: function() {

		this.setState("face-smile");
		this.view.setEnabled(true);
		
		// Generate the new tables:
		this.gamestate.pos.setEveryValueTo(0);
		this.randomizeFields();
		
	},


	// This event responds to a cell click.
	cellClick: function( cd ){
		
		if( this.gamestate.field.get(cd) === 1 ) {
			/* LOSE_GAME */
			
			for ( var i = 0, j = this.gamestate.field.v.length; i<j; i++) {
				
				if( this.gamestate.field.v[i] === 1 ) {
					this.gamestate.pos.setIndex(i,4);
				}
			}
			
			this.gamestate.pos.set(cd,5);
			
		} else {

			this.setState("face-cool");
			
			if( this.gamestate.pos.get(cd) === 1 ) {
				this.onCellClear( cd );
			} else {
				this.setupElement( cd );
			}

		}

	},
	
	leftMouseDown: function(cd) {
		this.setState("face-worried");
	},
	
	rightMouseDown: function(cd) {
		var ps = this.gamestate.pos;
		
		if( ps.get(cd) === 0 ) {
			// Switch from a blank cell to a flag.
			ps.set(cd, 2);
			
			if( this.useFlagWarnings ) {
				var cg = CKIT.Conditions.General;
				if( this.gamestate.pos.condition(cg.isEqualTo(2)).t > this.minecount ) {
					alert("You have too many flags!");
				}
			}
			
		} else {
			
			// If it is a flag switch to a flag question otherwise switch to nothing.
			if( ps.get(cd) === 2 && this.useFlagQuestion) {
				ps.set(cd,3);
			} else {
				ps.set(cd,0);
			}
		}
	}
	
	
	
});


CKIT.Utils.Base.assign('minesweeper.controller.main.menu', [

	{text:'File', children: [
		{text: 'New'},
		{text: 'Open'},
		{text: 'Save'},
		{text: '----'},
		{text: 'Quit'}	
	]},
	
	{text:'Settings', children: [
		{text: 'Change Profile'}
	]},
	
	{text:'Help', children: [
		{text: 'About', children:[
			{text:'Credits', children:[
				{text:'Developers'}
			]}
		]}
	]}

]);



})();
