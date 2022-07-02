JSAN.use('YAHOO');
JSAN.use('YAHOO.util.StyleSheet');
JSAN.use('GOLDOS.HTMLView');
JSAN.use('tictactoe.view.std.structure');
JSAN.use('QEvent');

CKIT.Class.assign('tictactoe.view.std.controller', {
	
	Has: ['name', 'size', 'geometry'],
	
	Extends: [GOLDOS.HTMLView],
	
	Onload: function() {
		
		var gs = this.geometry.size;
		this.blocksize = new tbsize( Math.round(gs.width/this.size.width)-10, Math.round(gs.height/this.size.height) );
		
	},
	
	display: function(container) {
		
		var s = new tictactoe.view.std.structure(this.name);
		var field = '';
		var bs = this.blocksize;
		
		this.size.loopGrid(function(cd) {
			
			if( cd.x === 0 ) {
				field += s.clearer();
			}
			
			field += s.cell(cd.x,cd.y, bs.width,bs.height, Math.min(bs.height-10, bs.width-10) );
			
		});
		
		container.innerHTML += s.myfield(field);
		
	},
	
	attachEvents: function(cellClick) {
		
		var view = this;
		
		QEvent.add(this.get(''),'click', function(e) {
			var cd = coord.fromString( view.decap(e.target.getAttribute("id")) );
			cellClick(cd);
		});
		
	},
	
	setEnabled: function(isEnabled) {
		
		var mycells = this.get('').getElementsByTagName('div');
		var newClass = (isEnabled) ? "cell" : "disabled";
		
		for (var i = 0, j = mycells.length; i < j; i++) {
			mycells[i].setAttribute("class", newClass);
		}
		
	},
	
	setIndex: function(index,value) {
		
		var cd = coord.fromIndex(index, this.size);
		var elem = this.get(cd.toString());
		
		if( value === 0 ) {
			elem.innerHTML = "";
		} else if( value === 1 ) {
			elem.innerHTML = "X";
		} else if( value === 2 ) {
			elem.innerHTML = "O";
		}
		
	},
	
	focusCoord: function(cd) {		
		this.get(cd.toString()).style.backgroundColor = '#880088';
	},
	
	resetCoord: function(cd) {
		this.get(cd.toString()).style.backgroundColor = 'white';
	}

});
