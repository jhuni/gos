JSAN.use('GOLDOS.CanvasView');
JSAN.use('Canvas.GridDrawer');
JSAN.use('Canvas.Image');
JSAN.use('Dom.CoordUtils');

(function() {
	
var xPiece = new Canvas.Image( Shape.Rect.fromNums(0,0,50,50), function(ctx) {
	
	ctx.beginPath();
	ctx.lineWidth = '3';
	ctx.moveTo(8,8);
	ctx.lineTo(42,42);
	ctx.moveTo(42,8);
	ctx.lineTo(8,42);
	ctx.stroke();
	
});

var oPiece = new Canvas.Image( Shape.Rect.fromNums(0,0,50,50), function(ctx) {
	
	ctx.beginPath();
	ctx.lineWidth = '3';
	ctx.fillStyle = "rgb(0,0,255)";
	ctx.arc(25,25, 20, 0, Math.PI*2, false);
	ctx.stroke();
	
});

CKIT.Class.assign('tictactoe.view.canvas.controller', {
	
	Has: ['name', 'size', 'geometry'],
	
	Extends: [GOLDOS.CanvasView],
	
	Onload: function() {
		
		var gs = this.geometry.size;
		this.cellSize = new tbsize( Math.round(gs.width/this.size.width), Math.round(gs.height/this.size.height) );
		
		this.data = Grid.fromRepetition(0,this.size);
		
	},
	
	draw: function() {
		Canvas.GridDrawer.drawGrid(this.ctx, this.geometry, this.size);
	},
	
	setEnabled: function(isEnabled) {
		
	},
	
	setIndex: function(index,value) {
		
		var cd = coord.fromIndex(index,this.size);
		var geometry = this._getCellGeometry(cd);
		
		if( value === 0 ) {
			this.ctx.clearRect(geometry.coord.x+3,geometry.coord.y+3,geometry.size.width-6,geometry.size.height-6);
		} else if( value === 1 ) {
			xPiece.render(this.ctx,geometry);	
		} else if( value === 2 ) {
			oPiece.render(this.ctx,geometry);
		}
		
		this.data.setIndex(index,value);
		
	},
	
	attachEvents: function(cellClick) {
		
		var self = this;
		this.on('click', function(e) {
			
			var cd = new coord(Math.floor(e.cd.x/self.cellSize.width), Math.floor(e.cd.y/self.cellSize.height));
			cellClick(cd);
		
		});
		
	},
	
	focusCoord: function(cd) {
		
		var g = this._getCellGeometry(cd);
		var ctx = this.ctx;
		
		ctx.save();
		ctx.strokeStyle = "#880088";
		ctx.lineWidth = '3';
		ctx.strokeRect(g.coord.x+30,g.coord.y+30,g.size.width-50,g.size.height-50);
		ctx.restore();
		
	},
	
	resetCoord: function(cd) {
		
		var g = this._getCellGeometry(cd);
		var ctx = this.ctx;
		
		ctx.clearRect(g.coord.x+15,g.coord.y+15,g.size.width-30,g.size.height-30);
		this.setIndex( cd.toIndex(this.size.width), this.data.get(cd) );
		
	},
	
	_getCellGeometry: function(cd) {
		return Shape.Rect.fromNums(cd.x*this.cellSize.width,cd.y*this.cellSize.height, this.cellSize.width,this.cellSize.height);
	}
	
	

});




})();
