CKIT.Class.assign('gnect.controller.main', {

	Has: ['view'],
	
	Onload: function() {
		this.appname = 'gnect';
		this.boardSize = this.view.boardSize;
		this.gamestate = new gnect.model.gamestate( Grid.fromRepetition(0,this.boardSize), 1 );
	},

	init: function() {
		
		var self = this;
		var view = this.view;
		
		this.gamestate.pos.setIndex = function(index,value) {
			this.v[index] = value;
			view.setIndex(index,value);	
		}
		
		this.view.attachEvents(self);
		
	},

	menuClick: function(path) {

	},
	
	resize: function(newGeometry) {
	
		/* Common Resize Routine */
		this.view.geometry = newGeometry;
		this.view.Onload();
		this.view.redisplay();
		this.init();
		
		/* Set View To Model */
		this.gamestate.pos.setValuesToList(this.gamestate.pos);
	
	},
	
	cellClick: function(cd) {
		var moveCoord = this.getLowestCoord(cd.x);
		if( !moveCoord ) {
			return false;
		}
		
		this.gamestate.pos.set(moveCoord,this.gamestate.turn);
		
		var connections = this.gamestate.pos.checkForConnections(moveCoord,4,CKIT.Conditions.General.isEqualTo(this.gamestate.turn)  );
		
		if( connections.length !== 0 ) {
			alert("Game Over: Win");
		}
		
		this.gamestate.toggleTurns();
	},
	
	getLowestCoord: function(xvalue) {
		var pos = this.gamestate.pos;
		var rval = new coord(xvalue,pos.size.height);
		
		while(1) {
			rval.addCoord(new coord(0,-1));
			
			if( rval.y === -1 ) {
				return false;	
			} else if( pos.get(rval) === 0 ) {
				return rval;
			}
			
		}
		
	}

});



CKIT.Utils.Base.assign('gnect.controller.main.menu', [

	{text:'File',children: [
		{text: 'New'}	
	]},
	
	{text:'Help', children: [
		{text: 'About'}
	]}
	
]);

