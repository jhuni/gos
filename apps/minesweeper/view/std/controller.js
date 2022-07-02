JSAN.use('YAHOO.util.Dom');
JSAN.use('GOLDOS.HTMLView');
JSAN.use('QEvent');

(function() {

var d = YAHOO.util.Dom;

CKIT.Class.assign('minesweeper.view.std.controller', {
	
	Has: ['name', 'size', 'geometry'],
	
	Extends: [GOLDOS.HTMLView],
	
	Onload: function() {
		
		var bs = this.size;
		var s = this.geometry.size;
		this.blockSize = new tbsize(Math.round(s.width/bs.width)-2, Math.round((s.height-32)/bs.height)-1 );
		this.imageDir = this.cwd + "view/Images/_alt/z1/";
				
	},
	
	display: function(container) {
		
		var self = this;
		var structure = new minesweeper.view.std.structure(this.name);
		
		var field = '';	
		
		this.size.loopGrid( function(cd) {
			
			if( cd.x === 0 ) field += structure.clearer();
			
			field += structure.cell(cd.x,cd.y, self.blockSize.width, self.blockSize.height);
		});
		
		// The display functionality:
		container.innerHTML += structure.minesweeper(structure.options() + structure.field(field));
		
		
		this.setState('face-smile');
		
		// Cache the buttons:
		this._cacheButtons = this.get('field').getElementsByTagName("button");
		
	},
	
	setEnabled: function(bool) {
		
		var b = this._cacheButtons;
		for( var i = 0, l = b.length; i < l; i++ ) {
			b[i].disabled = (bool) ? false : true;
		}
			
	},
	
	setState: function(setting) {
		this.get('state').style.backgroundImage = 'url(' + this.imageDir + setting + '.png)';
	},
	
	setIndex: function(index, value) {
		
		var cd = coord.fromIndex(index, this.size);
		var elem = this.get(cd.toString());
		
		if( value === 0 ) {
			this._setElementImage(elem, '');
		} else if( value === 1 ) {
			this._setElementMinecount(elem, this.sfield.get(cd));
		} else if( value === 2 ) {
			this._setElementImage(elem, 'flag');
		} else if( value === 3 ) {
			this._setElementImage(elem, 'flag-question');
		} else if( value === 4 ) {
			this._setElementImage(elem, 'mine');
		} else if( value === 5 ) {
			this._setElementImage(elem, 'bang');
			this.setState('face-sad');
			this.setEnabled(false);
		}
		
	},
	
	attachEvents: function(crtl) {
		
		var view = this;
		var field = this.get("field");
		
		QEvent.add(field, 'click', function(e) {
			var cd = coord.fromString( view.decap(e.target.getAttribute("id")) );
			crtl.cellClick(cd);	
		});
		
		QEvent.add(field, 'mousedown', function(e) {
			var elem = e.target;

			// We must be dealing with a blank square here:	
			if( elem.getAttribute("class") == "cell nl" ) {
				
				var cd = coord.fromString(   view.decap( elem.getAttribute("id") )   );
				
				if( e.rightClick ) {
					crtl.rightMouseDown(cd);
				} else {
					crtl.leftMouseDown(cd);
				}
				
			}	
		});
		
		QEvent.add(this.get('state'), 'click', function(e) {
			crtl.newGame();	
		});
		
	},
	
	focusCoord: function(cd) {
		d.addClass(this.get(cd.toString()), "focused");
	},
	
	resetCoord: function(cd) {
		d.removeClass(this.get(cd.toString()), "focused");
	},
	
	
	
	/** Private Functions: */
	_setElementImage: function(elem, img) {
		
		//d.setAttribute(elem, "class", "cell nl");
		
		if( img === '' ) {
			d.setAttribute(elem, "class", "cell nl");
			elem.innerHTML = '';
		} else {
			elem.innerHTML = '<img src="' + this.imageDir + img + '.png" alt="Minesweeper Image" width="100%" height="100%" />';
		}
		
	},
	
	_setElementMinecount: function(elem, minecount) {
		
		if( minecount === 0 ) {
			elem.innerHTML = "";
			d.setAttribute( elem, "class", "cell" );
		} else {
			var cellClasses = ["vlone", "vltwo", "vlthree", "vlfour", "vlfive", "vlsix", "vlseven", "vleight", "vlnine"];
			elem.innerHTML = minecount;
			d.setAttribute( elem, "class", "cell " + cellClasses[minecount - 1] );
		}
		
	}
	

});




})();
