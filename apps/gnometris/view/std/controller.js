JSAN.use('GOLDOS.HTMLView');

CKIT.Class.assign('gnometris.view.std.controller', {

	Has: ['name', 'size', 'geometry'],
	
	Extends: [GOLDOS.HTMLView],
	
	Onload: function() {
		var s = this.geometry.size;
		var boardSize = this.size;
		
		this.blocksize = new tbsize( Math.round( (s.width-100)/(boardSize.width+2) ), Math.round(s.height/(boardSize.height+2)) );
		
	},
		
	display: function( container ) {
		
		var structure = new gnometris.view.std.structure(this.name);
		
		// Create the inner elements of the field:
		var field = "";
		for( var i = 0; i < this.size.area(); i += 1 ) {
									// id            width                height
			field += structure.block(i.toString(), this.blocksize.width, this.blocksize.height);
		
		}
		
		// The size for the entire field:
		var myw = (this.size.width) * (this.blocksize.width + 2);
		var myh = (this.size.height) * (this.blocksize.height + 2);
		
		// Place the entire field:
		var output = structure.field('field', myw, myh, field);
		output += structure.sidepanel();
		
		container.innerHTML += structure.gnometris(output);
		
	},

	setIndex: function(index, value) {

		if( value === -1 ) {
			this.get(index).setAttribute("class", "blockblank");
		} else {
			this.get(index).setAttribute("class", "block" + value);
		}
		
	},

	setScoreLabel: function(name, value) {
		
		if( name == 'score' || name == 'lines' || name == 'level' ) {
			this.get(name).innerHTML = value;
		}
		
		return true;
		
	}


});
