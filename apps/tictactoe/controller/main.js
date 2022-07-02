JSAN.use('QEvent');

CKIT.Class.assign('tictactoe.controller.main', {
	
	Has: ['view', 'connections'],
	
	Onload: function() {

		// Arguments:
		this.appname = 'tictactoe';
		this.size = this.view.size;
		
		
		// Private variables:
		this.enabled = true;
		this.player = ['human', 'human'];
		
		var cells = new Grid(CKIT.Iter.repeat(0,this.size.area()).toArray(), this.size);
		this.gdata = new tictactoe.model.gamedata.ai(cells, 1, this.connections);
		
		this.gdata.init(); // necessary for histories
		
		var self = this;
		this.gdata.cells.setIndex = function(index,value) {
			this.v[index] = value;
			self.view.setIndex(index,value);			
		};
		
		this.focusCoord = new coord(0,0);

	},

	init: function() {
		
		// The obj to reference in events:
		var self = this;
		
		this.view.attachEvents(function(cd) {
			self.cellClick(cd);
		});
		
		if( this.currentPlayer() === 'computer' ) {
			this.placeElement(this.gdata.move());
		}
		
	},

	menuClick: function(path) {
		
		switch( path ) {
			
			case 'File/New':
				this.resetBoard();
				break;
			case 'Help/About':
				alert("Tictactoe: Part of the GoldOS project.");
				break;
			case 'History/Back':
				this.gdata.undoMove();
				break;
			case 'History/Forward':
				this.gdata.redoMove();
				break;
		}
		
	},
	
	keypress: function(e) {
		
		if( e.key === 'space' ) {
			this.cellClick(this.focusCoord);
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
		this.init();
		
		this.gdata.cells.setValuesToList(this.gdata.cells);
	},

	cellClick: function(cd) {

		if( this.gdata.cells.get(cd) === 0 && this.enabled ) {
			this.placeElement(cd);		
		}
		
	},

	disableBoard: function() {
		// Disable:
		this.enabled = false;
		this.view.setEnabled(false);
	},

	resetBoard: function() {
		// Enable:
		this.enabled = true;
		this.view.setEnabled(true);
		
		this.gdata.cells.setEveryValueTo(0);
		this.gdata.turnNumber = 1;
		this.gdata.turn = 1;
		
	},

	changeTurns: function() {
		
		var pl = this.currentPlayer();
		if( pl != "human" && this.enabled ) {
			this.placeElement(this.gdata.move());
		}
		
	},

	// This responds to the click event.
	placeElement: function(cd) {
		
		// Change settings variables:
		this.gdata.makeMove(cd);
		
		// Disable board if game is won or if no more moves are possible
		if( this.gdata.isWinningMove(cd) || (this.gdata.turnNumber-1) == this.size.area() ) {
			this.disableBoard();
			return 0;
		}

		this.changeTurns();
		
	},

	// Returns ('human' || 'computer')
	currentPlayer: function() {
		return( this.player[this.gdata.turn - 1] );	
	}
	
});





CKIT.Utils.Base.assign('tictactoe.controller.main.menu', [
	
	{text:'File', children: [
		{text: 'New'}	
	]},
	
	{text:'History', children: [
		{text:'Back'},
		{text:'Forward'}
	]},
	
	{text:'Help', children: [
		{text: 'About'}
	]}
	
]);

/*
var tango = './assets/tango';
pkg.menu = {

	'File': [
		{text:'New', icon: tango + '/actions/document-new.png'},
		{text:'Open', icon: tango + '/actions/document-open.png'},
		{text:'Save', icon: tango + '/actions/document-save.png'},
		{text:'Save As', icon: tango + '/actions/document-open.png'},
		{text:'----'},
		{text:'Exit', icon: tango + '/actions/system-log-out.png'}
		],

	'Edit': [
		{text:'Undo', icon: tango + '/actions/edit-undo.png'},
		{text:'Redo', icon: tango + '/actions/edit-redo.png'}
		],

	'Settings': [
		{text:'Preferences', icon: tango + '/categories/preferences-desktop.png'}
		],

	'Help': [
		{text:'About Textedit'}
		]

};*/
