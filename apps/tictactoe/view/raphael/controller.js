JSAN.use('Raphael');

CKIT.Class.assign('tictactoe.view.raphael.controller', {
	
	Has: ['name', 'size', 'geometry'],
	
	Extends: [GOLDOS.HTMLView],
	
	Onload: function() {
		var gs = this.geometry.size;
		this.blocksize = new tbsize( Math.round(gs.width/this.size.width)-10, Math.round(gs.height/this.size.height) );
	},
	
	display: function(container) {

		var root = this.createRoot();
		container.appendChild(root);
		
		this.paper = Raphael(root,this.geometry.size.width,this.geometry.size.height);
		var paper = this.paper;
		
		for( var x = 0; x < this.size.width; x++ ) {
			paper.path({stroke:"#000"}).moveTo(this.blocksize.width*x,0).lineTo(this.blocksize.width*x,this.geometry.size.height);
		}
		
		for( var y = 0; y < this.size.width; y++ ) {
			paper.path({stroke:"#000"}).moveTo(0,this.blocksize.height*y).lineTo(this.geometry.size.width,this.blocksize.height*y);
		}
		
		
	},
	
	attachEvents: function(cellClick) {
		
		var self = this;
		var root = this.get('');
		this.get('').onclick = function(e) {
			var ecd = coord.getFromPageElement(root).inverse().addCoord(coord.getFromPageEvent(e));
			var cd  = new coord(Math.floor(ecd.x/self.blocksize.width),Math.floor(ecd.y/self.blocksize.height));
			cellClick(cd);
		}
		
	},
	
	setEnabled: function() {
		
	},
	
	setIndex: function(index,value) {
		var cd = coord.fromIndex(index,this.size);
		var paper = this.paper;
		
		if( value == 2 ) {
			var radius = Math.floor( Math.min(this.blocksize.width/2,this.blocksize.height/2) )-10;
			var circle = paper.circle((cd.x+0.5)*this.blocksize.width,(cd.y+0.5)*this.blocksize.height,radius);
			circle.attr("stroke", "#000");
			circle.attr("stroke-width", 3);
		} else if( value == 1 ) {
			var gcd = new coord(cd.x*this.blocksize.width,cd.y*this.blocksize.height);
			paper.path({"stroke":"#000", "stroke-width":3}).moveTo(gcd.x+15,gcd.y+15).lineTo(gcd.x+this.blocksize.width-15,gcd.y+this.blocksize.height-15);
			paper.path({"stroke":"#000", "stroke-width":3}).moveTo(gcd.x+this.blocksize.width-15,gcd.y+15).lineTo(gcd.x+15,gcd.y+this.blocksize.height-15);
		}
		
	},
	
	focusCoord: function(cd) {
		
	},
	
	resetCoord: function(cd) {
		
	}
	
	
});
