JSAN.use('GOLDOS.CanvasView');
JSAN.use('QEvent');

(function() {
	
var redPiece = new Canvas.Image( Shape.Rect.fromNums(0,0,50,50), function(ctx) {
	
	ctx.beginPath();
	ctx.lineWidth = '2';
	ctx.fillStyle = "rgb(255,0,0)";
	ctx.arc(25,25, 23, 0, Math.PI*2, false);
	ctx.stroke();
	ctx.fill();
	
});

var bluePiece = new Canvas.Image( Shape.Rect.fromNums(0,0,50,50), function(ctx) {
	
	ctx.beginPath();
	ctx.lineWidth = '2';
	ctx.fillStyle = "rgb(0,0,255)";
	ctx.arc(25,25, 23, 0, Math.PI*2, false);
	ctx.stroke();
	ctx.fill();
	
});
	
CKIT.Class.assign('gnect.view.std.controller', {

	Has: ['name', 'boardSize', 'geometry'],
	
	Extends: [GOLDOS.CanvasView],
	
	Onload: function() {
		this.cellSize = new tbsize(Math.round(this.geometry.size.width/this.boardSize.width),Math.round(this.geometry.size.height/this.boardSize.height));
	},
	
	draw: function() {
		Canvas.GridDrawer.drawGrid(this.ctx,this.geometry,this.boardSize);
	},
	
	setIndex: function(index, value) {
		
		var cd = coord.fromIndex(index,this.boardSize);
		var geometry = Shape.Rect.fromNums(cd.x*this.cellSize.width,cd.y*this.cellSize.height,this.cellSize.width,this.cellSize.height);
		
		if( value === 0 ) {
			this.ctx.clearRect(geometry.coord.x+2,geometry.coord.y+2,geometry.size.width-3,geometry.size.height-3);
		} else if( value === 1 ) {
			redPiece.render(this.ctx,geometry);	
		} else if( value === 2 ) {
			bluePiece.render(this.ctx,geometry);
		}
		
	},
	
	attachEvents: function(self) {
		
		var view = this;
		
		this.on('click', function(e) {

			// Handle:
			var cd = new coord(Math.floor(e.cd.x/view.cellSize.width), Math.floor(e.cd.y/view.cellSize.height));
			self.cellClick(cd);
			
		} );
		
	}

});



})();
