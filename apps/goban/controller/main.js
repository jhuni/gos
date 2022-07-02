CKIT.Class.assign('goban.controller.main', {
	
	Has: ['view'],
	
	Onload: function() {
		this.appname = 'goban';
		this.boardSize = this.view.boardSize;
		this.gd = new goban.model.gamedata( Grid.fromRepetition(-1,this.boardSize), 0);
	},

	init: function() {
		
		// attach setIndex handler
		var obj = this;
		
		this.gd.board.setIndex = function(index,value) {
			obj.gd.board.v[index] = value;
			obj.view.placePiece(coord.fromIndex(index,obj.boardSize), value);
		}
		
		this.view.attachEvents(this);
	},

	resize: function(newGeometry) {
		/* Common Resizing routine */
		this.view.geometry = newGeometry;
		this.view.Onload();
		this.view.redisplay();
		this.init();
		
		// Set view to model:
		this.gd.board.setValuesToList(this.gd.board);
	},

	menuClick: function(path) {
		
		if( path == 'File/New' ) {
			this.gd.turn = 0;
			this.gd.board.setEveryValueTo(-1);
		} else if( path == 'Help/About' ) {
			
			alert(" Made by Jhuni \n Part of the GoldOS project.");
			
		}
		
	},

	cellClick: function(cd) {
		
		if( this.gd.isValidMove(cd) ) {
			this.gd.makeMove(cd);
		}
		
	}

});



CKIT.Utils.Base.assign('goban.controller.main.menu', [

	{text:'File', children: [
		{text: 'New'}	
	]},
	
	{text:'Help', children: [
		{text: 'About'}
	]}

]);
