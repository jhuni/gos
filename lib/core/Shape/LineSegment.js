/*jsan __header__ */

JSAN.use('CKIT');
JSAN.use('coord');

/*jsan __end__ */

Joose.Class('Shape.LineSegment', {
	
	constructor: function(start, end) {
		
		this.start = start;
		this.end = end;
		
	},
	
	has: {
		start: {},
		end: {}
	},
	
	methods: {
		getDistCoord: function() {
			return coord.sum( this.end, this.start.inverse() );
		},
		
		getMidPoint: function() {
			return coord.sum( this.start, this.getDistCoord().multiply(1/2) );
		},
		
		getDistance: function() {
			var dist = this.getDistCoord();
			return( Math.sqrt( dist.x*dist.x + dist.y*dist.y )  );
		},
		
		getAngle: function() {
			var dist = this.getDistCoord();
			return(  Math.atan2(dist.x,dist.y)  );
		},
		
		toString: function() {
			return( this.start.toString() + " -> " + this.end.toString() );
		}
	}
	
});




/*
CKIT.Class.assign('Shape.LineSegment', {
	
	Has: ['start','end'],
	
	getDistCoord: function() {
		return coord.sum( this.end, this.start.inverse() );
	},
	
	getMidPoint: function() {
		return coord.sum( this.start, this.getDistCoord().multiply(1/2) );
	},
	
	getDistance: function() {
		var dist = this.getDistCoord();
		return( Math.sqrt( dist.x*dist.x + dist.y*dist.y )  );
	},
	
	getAngle: function() {
		var dist = this.getDistCoord();
		return(  Math.atan2(dist.x,dist.y)  );
	},
	
	toString: function() {
		return( this.start.toString() + " -> " + this.end.toString() );
	}
	
});*/
