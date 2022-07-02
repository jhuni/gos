JSAN.use('Lang.Utils');
Lang.Utils.makeNamespace('Canvas.Grid.Maze');

Canvas.Grid.Maze = function(pos, bgcolor, wallcolor) {

	this.pos = pos;
	
	if( typeof bgcolor == 'undefined' ) {
		bgcolor = 'rgb(0, 0, 0)';	
	}
	
	if( typeof wallcolor == 'undefined' ) {
		wallcolor = 'rgb(0, 255, 0)';
	}
	
	this.bgcolor = bgcolor;
	this.wallcolor = wallcolor;

};



Canvas.Grid.Maze.prototype = {

draw: function(mysize) {

	var canvas = document.getElementById("canvas");
	var pos = this.pos;

	if (canvas.getContext) {
	
		var ctx = canvas.getContext("2d");
		var bx = Math.floor(mysize / pos.length);

		for (var hi = 0; hi < pos.length; hi++) {

			for (var i = 0; i < pos[hi].length; i++) {

				var mtype = pos[hi].charAt(i);
				
				if (mtype == "0") {
					ctx.fillStyle = this.bgcolor;
					ctx.fillRect ((i * bx), (hi * bx), bx, bx);
				} else {					
					ctx.fillStyle = this.wallcolor;
					ctx.fillRect ((i * bx), (hi * bx), bx, bx);
				}
				
			}
			
		}	

	} // End if
	
	return(1);
	
},

drawPath: function(x, y, direction, bx){

	var canvas = document.getElementById("canvas");
	
	if( canvas.getContext ) {

		var ctx = canvas.getContext("2d");
		
		ctx.beginPath();
		ctx.moveTo(x, y);
		var new_pos = new Array(x, y);
		
		if(direction == "n"){
			new_pos[1] -= bx;	
		} else if (direction == "s") {
			new_pos[1] += bx;
		} else if (direction == "e") {
			new_pos[0] -= bx;
		} else if (direction == "w") {
			new_pos[0] += bx;
		}
		ctx.lineTo(new_pos[0], new_pos[1]);
		
		ctx.strokeStyle = "rgb(255, 255, 255)";		
		ctx.stroke();
		return new_pos;	
	
	}
	
	return false;

},

drawFullPath: function(path, size) {

	var bx = Math.floor(size / this.pos.length);
	var startx = Math.round(bx / 2);
	var starty = Math.round(size - (bx / 2));
	
	if( typeof(path) != "string" ) {
		return 0;
	}

	var place = new Array(startx, starty);
	for( var i = 0; i < path.length; i++ ) {
		place = this.drawPath(place[0], place[1], path.charAt(i), bx );
	}
	
	return 1;

}



}; // End Prototype


