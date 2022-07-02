JSAN.use('GOLDOS.CanvasView');
JSAN.use('Canvas.Image');
JSAN.use('Canvas.GridDrawer');
JSAN.use('QEvent');

(function(){

var blackGoPiece = new Canvas.Image( Shape.Rect.fromNums(0,0,50,50), function(ctx) {
	
	ctx.beginPath();
	ctx.lineWidth = '2';
	ctx.fillStyle = "rgb(50,50,50)";
	ctx.arc(25,25, 24, 0, Math.PI*2, false);
	ctx.stroke();
	ctx.fill();
	
});

var whiteGoPiece = new Canvas.Image( Shape.Rect.fromNums(0,0,50,50), function(ctx) {
	
	ctx.beginPath();
	ctx.lineWidth = '2';
	ctx.fillStyle = "rgb(225,225,225)";
	ctx.arc(25,25, 24, 0, Math.PI*2, false);
	ctx.stroke();
	ctx.fill();
	
});

CKIT.Class.assign('goban.view.std.controller', {
	
	Has: ['name', 'boardSize', 'geometry'],
	
	Extends: [GOLDOS.CanvasView],

	draw: function() {
		
		var ctx = this.ctx;
		
		var x      = this.geometry.coord.x+10;
		var y      = this.geometry.coord.y+10;
		var width  = this.geometry.size.width-20;
		var height = this.geometry.size.height-20;
		
		var coordFactor = new coord(Math.round(width/this.boardSize.width), Math.round(height/this.boardSize.height));
		var coordDiff = coordFactor.byval().multiply(1/2);
		
		this.coordFactor = coordFactor;
		this.coordDiff = coordDiff;
		
		ctx.save();
		ctx.strokeStyle = "#000000";
		ctx.lineWidth = '10';
		ctx.strokeRect(this.geometry.coord.x+5,this.geometry.coord.y+5,this.geometry.size.width-10,this.geometry.size.height-10);
		ctx.restore();
		
		ctx.save();
		ctx.translate(x,y);
		ctx.fillStyle = "#dcb35c";
		ctx.fillRect(0,0,width,height);
		
		var gridGeometry = Shape.Rect.fromNums(coordDiff.x,coordDiff.y,width-coordFactor.x,height-coordFactor.y);
		Canvas.GridDrawer.drawGrid(ctx, gridGeometry, new tbsize(this.boardSize.width-1,this.boardSize.height-1) );		
		
		ctx.restore();
		
	},

	placePiece: function(goCoord,turn) {
		
		var screenCoord = new coord(this.coordFactor.x*goCoord.x,this.coordFactor.y*goCoord.y).addCoord(this.coordDiff.byval().multiply(1/2));
		
		if( turn != -1 ) {
			
			/* Handle the image rendering: */
			var myimage = (turn != 0) ? whiteGoPiece : blackGoPiece;
			myimage.render(this.ctx, new Shape.Rect(screenCoord, new tbsize(this.coordDiff.x,this.coordDiff.y)) );
		} else {
			
			this.ctx.clearRect(screenCoord.x,screenCoord.y,this.coordDiff.x, this.coordDiff.y);
			
			this.ctx.fillStyle = "#dcb35c";
			this.ctx.fillRect(screenCoord.x,screenCoord.y,this.coordDiff.x, this.coordDiff.y);
			
		}
		
	},
	
	getGoCoord: function(cd) {
	
		var goCoord = coord.sum(  cd,this.geometry.coord.inverse(),this.coordDiff.inverse()  );
		return( new coord(Math.round(goCoord.x/this.coordFactor.x),Math.round(goCoord.y/this.coordFactor.y))  );
		
	},
	
	attachEvents: function(crtl) {
		
		var view = this;
		
		this.on('click', function(e) {
			crtl.cellClick( view.getGoCoord(e.cd) );
		});
		
	}

});



})();

