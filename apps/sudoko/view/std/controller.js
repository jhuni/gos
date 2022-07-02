JSAN.use('YAHOO');
JSAN.use('YAHOO.util.StyleSheet');
JSAN.use('GOLDOS.HTMLView');
JSAN.use('QEvent');
JSAN.use('sudoko.view.std.structure');

CKIT.Class.assign('sudoko.view.std.controller', {
	
	Has: ['name', 'geometry'],
	
	Extends: [GOLDOS.HTMLView],
	
	Onload: function() {
		this.size       = new tbsize(9,9);
		this.blocks     = new tbsize(3,3);
		this.blockCells = new tbsize(3,3);	
		
		var sz = Math.max(this.geometry.size.width/20,this.geometry.size.height/20);
		this.blocksize  = new tbsize(sz,sz);
		
	},
	
	

	display: function( container ) {
		
		var s = new sudoko.view.std.structure(this.name);
		var field = '';
		
		for( var currentBlock = 1; currentBlock <= this.blocks.area(); currentBlock++ ) {
			
			// Create the block:
			var block = '';
			for( var blockCell = 1; blockCell <= this.blockCells.area(); blockCell++ ) {
				
				var mycell = this.getBlockCell(currentBlock, blockCell);
				
				block += s.cell( mycell.toString(), this.blocksize.width, this.blocksize.height );
				
				if( (blockCell % this.blockCells.width) === 0 ) {
					block += s.clearer();
				}
			}
			
			
			field += s.block( block, (this.blocksize.width+2)*this.blockCells.width );
			
			if( (currentBlock % this.blocks.width) === 0 ) {
				field += s.clearer();
			}
			
		}
		
		field = s.position(field);
		
		container.innerHTML += s.sudoko(field);	
		
	},
	
	attachEvents: function(crtl) {
		
		var view = this;
		
		QEvent.add(this.get(''), 'click', function(e) {
			
			if( e.target.getAttribute("class") == "cell" ) {	
				var cd = coord.fromString( view.decap(e.target.getAttribute("id")) );
				crtl.clickCoord(cd);
			}
			
		});
		
	},
	
	setIndex: function(index,value) {
		
		var elem = this.get(coord.fromIndex(index,this.size))
		
		if( value == 0 ) {
			elem.innerHTML = '';
		} else { 
			elem.innerHTML = value;
		}
		
	},
	
	highlightCoord: function(cd) {
		this.get(cd.toString()).style.backgroundColor = "#88AAff";	
	},
	
	unhighlightCoord: function(cd) {
		this.get(cd.toString()).style.backgroundColor = "#ffffff";
	},

	getBlockCell: function(block, cellNumber) {
	
		var firstCoord = coord.fromIndex(block-1, this.blocks);
		var mycoord = new coord( firstCoord.x * this.blocks.width, firstCoord.y * this.blocks.height );
		mycoord.addCoord(  coord.fromIndex(cellNumber-1,this.blockCells)  );
		return( mycoord );
	
	}
	
	
	
});

