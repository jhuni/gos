
CKIT.Class.assign('colorlines.view.std.controller', {

	Has: ['name', 'size', 'blocksize'],
	
	display: function(container, width, height) {
		
		var structure = new colorlines.view.std.structure(this.name);
		
		var mysize = this.size;
		var bs = this.blocksize;
		
		var i = 1, j = mysize.area();

		var mtable = '';
		for( var i = 1; i <= j; i++ ) {
			
			if( (i-1) % mysize.width == 0 ) {
				mtable += structure.clearer();
			}
			
			mtable += structure.cell("cell" + i, bs.width, bs.height, '');
			
		}

		container.innerHTML += structure.mytable(mtable);

	}

});
