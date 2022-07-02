JSAN.use('CKIT');

CKIT.Class.assign('Grid.Maze.Solver', {
	
	Has: ['pos'],
	
	Onload: function() {
		// Variables the user does not need to know about yet
		this.coord = new Array(0, pos.length - 1);
		this.path = "";
		this.oldcoords = new Array();
		this.divergencies = new Array();
		this.solved = false;
	},

	moveCoord: function(direction){

		if( direction == "n" ) {
			this.coord[1] -= 1;	
		} else if( direction == "e" ) {
			this.coord[0] -= 1;
		} else if( direction == "s" ) {
			this.coord[1] += 1;
		} else if( direction == "w" ) {
			this.coord[0] += 1;
		}
		
		return 1;
		
	},

	isOldCoord: function(x, y) {

		for( var i = 0; i < this.oldcoords.length; i++ ) {

			var oc = this.oldcoords[i];	
			if( x == oc[0] && y == oc[1] ){
				return true;
			}	
		
		}
		
		return false;

	},

	solve: function(){

		for( var i = 0; (this.solved == false); i++ ) {
			this.oldcoords.push( new Array(this.coord[0], this.coord[1]) );
			this.moveNextOption();
		}
		
	},

	setupDivergencies: function(opt){

		for(var i = 0; i < 4; i++){
			if( opt.charAt(i) == "1" && i != opt.indexOf("1") ){
			
				var pt = this.path;			
				var dir = this.getDirection( i );
				var tmpcrd = new Array(this.coord[0], this.coord[1]);
				
				this.divergencies.push( new Array(pt, dir, tmpcrd) );
			
			}
		}
		
	},

	// This is essential for solving 
	moveNextOption: function(){

		if( this.coord[0] == (pos[0].length - 1) && this.coord[1] == 0 ){
			this.solved = true;		
			return 1;			
		}	
		
		var opt = this.getSquareOptions( this.coord[0], this.coord[1]);	
		var dir;

		if( opt.indexOf("1") == "-1" ) {
		
			var myarray = this.divergencies.pop();
			this.path = myarray[0];
			dir = myarray[1];
			this.coord = myarray[2];
			
		} else {
		
			dir = this.getFirstOption(opt);
		
			if( opt.indexOf("1") != opt.lastIndexOf("1") ) {
				this.setupDivergencies(opt);	
			} 
		
		}
		
		this.moveCoord(dir);
		this.path += dir;
		
	},

	getSquare: function(x, y) {
		return this.pos[y].charAt(x);
	},

	getSquareOptions: function(x, y) {

		var rval = new Array("1", "1", "1", "1");
		var bounds = new Array(0, pos[0].length - 1, pos.length - 1, 0);
		var chcoords = new Array();
		
		chcoords[0] = new Array(x, y - 1);
		chcoords[1] = new Array(x + 1, y);
		chcoords[2] = new Array(x, y + 1);
		chcoords[3] = new Array(x - 1, y);

		for( var i = 0; i < rval.length; i++ ) {
		
			var opc = (i == 0 || i == 2) ? y : x;		
			
			if( opc == bounds[i] ){
			
				rval[i] = "0";
				
			} else {
			
				var c = chcoords[i];
				var sqr = this.getSquare( c[0], c[1] ); 
				
				if( sqr == "1" || (this.isOldCoord(c[0], c[1]) == true) ) {
					rval[i] = "0";
				}
				
			}
			
		}
		
		return rval.join("");	
		
	},

	getDirection: function(val){
		
		var assoc = new Array('n', 'w', 's', 'e');
		return assoc[val];
		
	},

	getFirstOption: function(options){
		return this.getDirection( options.indexOf("1") );	
	}


});


