CKIT.Class.assign('sudoko.controller.main', {

	Has: ['view'],
	
	Onload: function() {
		
		this.appname = 'sudoko';
		this.size = new tbsize(9,9);
		
		this.highlightedCoord = -1;
		
	},
	
	init: function() {
		
		this.pos = new Grid([
			0,0,0,  0,0,0,  5,0,0,
			1,6,0,  9,0,0,  0,0,0,
			0,0,9,  0,6,4,  0,0,0,
			
			0,0,0,  0,0,0,  0,0,4,
			4,0,0,  0,2,0,  1,0,0,
			0,0,0,  3,0,0,  0,5,0,
			
			0,0,2,  0,8,9,  0,0,0,
			0,1,0,  2,5,0,  0,3,0,
			7,0,0,  1,0,0,  0,0,9
		], this.size);
		
		var view = this.view;
		this.pos.setIndex = function(index,value) {
			this.v[index] = value;
			view.setIndex(index,value);
		};
		
		//var mypos = sudoko.model.solver.solve(mypos);
		this.pos.setValuesToList(this.pos);
		
		this.view.attachEvents(this);
		
		var self = this;
		QEvent.add(window, 'keypress', function(e) {
			self.keypress(e);
		});
		
	},
	
	menuClick: function(path) {
	
		switch( path ) {
			
			case "Help/About":
				alert("Sudoko Application made by Jhuni");
				break;
			
		}
			
	},

	resize: function(newGeometry) {
		
	},
	
	keypress: function(e) {
		
		if( !isNaN(e.key ) && this.highlightedCoord != -1 ) {
			this.pos.set(this.highlightedCoord,e.key);
		}
		
	},
	
	clickCoord: function(cd) {
		
		if( this.highlightedCoord != -1 ) {
			this.view.unhighlightCoord(this.highlightedCoord);
		}
		
		this.view.highlightCoord(cd);
		this.highlightedCoord = cd;
		
	}

});


CKIT.Utils.Base.assign('sudoko.controller.main.menu', [

	{text:'Help', children:[
		{text:'About'}
	]}

]);
