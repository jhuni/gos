/*jsan __header__ */

JSAN.use('CKIT');
JSAN.use('tbsize');
JSAN.use('coord');

/*jsan __end__ */

CKIT.Class.assign('Grid', {
	
	Has: ['values', 'size'],
	
	Extends: [CKIT.List],
	
	Onload: function() {
		this.v = this.values;
		this.sz = this.size;
		this.elems = this.v.length;
		this.iterIndex = 0;
	},
	
	getIndex: function(index) {
		return this.v[index];
	},
	
	setIndex: function(index, value) {
		this.v[index] = value;
	},
	
	get: function(cd) {
		return(  this.getIndex( cd.toIndex(this.size.width) )  );
	},
	
	set: function(cd,value) {
		this.setIndex( cd.toIndex(this.size.width), value );	
	},
	
	toString: function() {
		
		var rval = "";
		var self = this;
		this.size.loopGrid(function(cd) {
			
			if( cd.x === 0 && cd.y !== 0 ) { 
				rval += "\n"; 
			}
			rval += self.get(cd) + " ";
			
		} );
		return rval;
		
	},
	
	toMultiArray: function() {
	
		var self = this;
		var rval = [];
		var rowVal = [];
		
		this.size.loopGrid( function(cd) {
			
			if( cd.x === 0 && cd.y !== 0 ) {
				rval.push(rowVal);
				rowVal = [];
			}
			
			rowVal.push(self.get(cd));
			
		} );
		
		return rval;
		
	},
	
	byval: function() {
		return new Grid(this.v.slice(), this.sz.byval());
	}
	
});

Grid.extend( {
	
	fromMultiArray: function(multiArray) {
		
		var s = tbsize.fromMultiArray(multiArray);
		var rval = [];
		
		s.loopGrid( function(cd) {
				rval[rval.length] = multiArray[cd.y][cd.x];
		});
		
		return new Grid(rval,s);
		
	},
	
	fromRepetition: function(repval, size) {
			return new Grid(  CKIT.Iter.repeat(repval, size.area()).toArray(),  size  );
	}
	
});

JSAN.use('Grid.CoordMap');
JSAN.use('Grid.Directions');



/*
JSAN.use('Grid.Transformations');

var mygrid = new Grid([
 1,1,1,1,
 0,0,1,0,
 0,0,1,0,
 0,0,0,0
],new tbsize(4,4));




alert( mygrid );
*/



/*

This library is based on Array which means that you can
effectively perform all of the functions you would normally
perform on an array. this.v.indexOf(1) this further
means you can easily access based on index rather then coordinate.

*/
