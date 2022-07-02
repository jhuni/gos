JSAN.use('YAHOO');
JSAN.use('YAHOO.util.StyleSheet');
JSAN.use('YAHOO.util.Dom');
JSAN.use('GOLDOS.HTMLView');
JSAN.use('QEvent');
JSAN.use('checkers.view.std.structure');

(function(){
	
var d = YAHOO.util.Dom;

var _getNormalIndexClass = function(view, index) {
	var y = Math.floor(index/view.size.height);
	var myin = index+y;
	return( ((myin%2===0) ? 'cellp1': 'cellp2') );
};


Joose.Class('checkers.view.std.controller', {
	
	constructor: function(name, size, geometry) {
		// Handle arguments:
		this.name = name;
		this.size = size;
		this.geometry = geometry;
		
		// Onload:
		var s = this.geometry.size;
		this.blocksize = new tbsize(  Math.floor(s.width/this.size.width)-5, Math.floor(s.height/this.size.height)  );
	},
	
	has: {
		size: {},
		geometry: {}
	},
	
	isa: GOLDOS.HTMLView,
	
	methods: {
		
		display: function(container) {
			
			// Variable Declarations:
			var structure = new checkers.view.std.structure(this.name);
			var myhtml = '';
			
			var i = 0;
			var t = this;
			
			// Create the Grid interface:
			this.size.loopGrid(function(cd) {
				
				if( cd.x === 0 ) {
					myhtml += structure.clearer();
				}
				
				var className = _getNormalIndexClass(t,i);
				myhtml += structure.cell(i,t.blocksize.width,t.blocksize.height, className);
					
				i++;
			});
			
			myhtml = structure.board(myhtml);
			myhtml = structure.checkers(myhtml);
			
			container.innerHTML += myhtml;
			
		},
		
		attachEvents: function(clickIndex) {
			
			var view = this;
			
			QEvent.add(this.get('board'), 'mousedown', function(e) {
				var index = view.getElementIndex(e.target);
				
				if( index != -1 ) {
					clickIndex( index );    
				}	
			
			});
			
		},

		// Valid values: [0,1,2] 0 == blank
		setIndex: function(index, value) {

			var elem = this.get(index);
			var img1 = './apps/checkers/view/Images/_alt/z1/blackpiece.png';
			var img2 = './apps/checkers/view/Images/_alt/z1/redpiece.png';
			
			if( value === 0 ) {
				// This means it is a blank square.
				elem.innerHTML = '';
			} else if ( value == 1 ) {
				elem.innerHTML = '<img id="' + this.encap('img' + index) + '" style="width: 100%; height: 100%;" src=' + img1 + ' alt="R"></img>';
			} else if ( value == 2 ) {
				elem.innerHTML = '<img id="' + this.encap('img' + index) + '" style="width: 100%; height: 100%;" src=' + img2 + ' alt="B"></img>';
			}
			
		},

		// Returns -1 for a failed attempt, or an unsigned int for 
		// a working value. This also evaluates if the user clicked on an img.
		getElementIndex: function(elem) {

			var id = elem.getAttribute("id");
			
			if( id === null ) {
				return -1;
			}
			
			var myid = this.decap(id);
			var myvalue = (elem.tagName === 'IMG') ? parseInt(myid.substr(3), 10) : parseInt(myid, 10);
				
			return( isNaN(myvalue) ? -1 : myvalue );
			
		},

		highlightCell: function(mycell) {
			d.setAttribute( this.get(mycell), "class", "cellactive" );
		},

		normalizeCell: function(mycell) {
			d.setAttribute( this.get(mycell), "class", _getNormalIndexClass(this,mycell)  );	
		},
		
		resetCoord: function(cd) {
			this.normalizeCell(cd.toIndex(this.size.width));
		},
		
		focusCoord: function(cd) {
			d.setAttribute( this.get(cd.toIndex(this.size.width)), "class", "focused");
		}	
		
	}
	
});






})();

