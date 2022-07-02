JSAN.use('GOLDOS.CanvasView');
JSAN.use('Canvas.GridDrawer');
JSAN.use('QEvent');

(function() {

var imgdir = './apps/chess/view/Images/_alt/z1/';
var black = [];
black[0] = new Image(); black[0].src = imgdir + 'bp.png';
black[1] = new Image(); black[1].src = imgdir + 'bn.png';
black[2] = new Image(); black[2].src = imgdir + 'bb.png';
black[3] = new Image(); black[3].src = imgdir + 'br.png';
black[4] = new Image(); black[4].src = imgdir + 'bk.png';
black[5] = new Image(); black[5].src = imgdir + 'bq.png';

var white = [];
white[0] = new Image(); white[0].src = imgdir + 'wp.png';
white[1] = new Image(); white[1].src = imgdir + 'wn.png';
white[2] = new Image(); white[2].src = imgdir + 'wb.png';
white[3] = new Image(); white[3].src = imgdir + 'wr.png';
white[4] = new Image(); white[4].src = imgdir + 'wk.png';
white[5] = new Image(); white[5].src = imgdir + 'wq.png';

Joose.Class('chess.view.canvas.controller', {

	constructor: function(name, size, geometry) {
		this.name = name;
		this.size = size;
		this.geometry = geometry;
	
		this.Onload();
	},
	
	isa: GOLDOS.CanvasView,
	
	methods: {
			
		Onload: function() {
			var s = this.geometry.size;
			this.blocksize = new tbsize(  Math.floor(s.width/this.size.width), Math.floor(s.height/this.size.height)  );
			
			this.data = Grid.fromRepetition(0,this.size);
			
		},
		
		draw: function() {
			Canvas.GridDrawer.drawGrid(this.ctx,this.geometry,this.size);
		
			var view = this;
			this.size.loopGrid( function(cd) {
				view._drawCellBackground(cd);
			});
		},
		
		attachEvents: function(clickCoord) {
			
			var view = this;
			this.on('mousedown', function(e) {
				// Deal:
				var cd = new coord(Math.floor(e.cd.x/view.blocksize.width), Math.floor(e.cd.y/view.blocksize.height));
				clickCoord(cd);
			});
			
		},
		
		setIndex: function(index,value) {
			
			var cd = coord.fromIndex(index, this.size);
			var g = this._getCellGeometry(cd);
			this.data.setIndex(index,value);
			
			if( value !== 0 ) {
				
				this._drawCellBackground(cd);
				this._drawCellPiece(g,value);
				
			} else {
				
				this.ctx.clearRect(g.coord.x, g.coord.y, g.size.width, g.size.height);
				this._drawCellBackground(cd);
				
			}
			
		},
		
		highlightCoord: function(cd,value) {
		
			var ctx = this.ctx;
			var g = this._getCellGeometry(cd);
			
			ctx.fillStyle = "#0000FF";
			ctx.fillRect(g.coord.x,g.coord.y,g.size.width,g.size.height);
			
			this._drawCellPiece(g,value);
		},
		
		resetCoord: function(cd) {
			var index = cd.toIndex(this.size.width);
			this.setIndex( index, this.data.getIndex(index) );
		},
		
		focusCoord: function(cd) {
			
			var g = this._getCellGeometry( cd );
			var ctx = this.ctx;

			ctx.strokeStyle = "#880088";
			ctx.lineWidth = '3';
			ctx.strokeRect(g.coord.x+10,g.coord.y+10,g.size.width-20,g.size.height-20);
				
		},
		
		
		_drawCellPiece: function(g, value) {
			var img = black[0];
			if( value < 0 ) {
				img = black[Math.abs(value)-1];	
			} else {
				img = white[value-1];
			}
			
			this.ctx.drawImage(img, g.coord.x, g.coord.y, g.size.width, g.size.height);
		},

		_drawCellBackground: function(cd) {
		
			var ctx = this.ctx;
			
			var g = this._getCellGeometry(cd);
			var index = cd.toIndex(this.size.width);
			
			var y = index+Math.floor(index/this.size.height);
			
			if( y % 2 !== 0 ) {
				ctx.fillStyle = "#CCCCCC";
				ctx.fillRect(g.coord.x,g.coord.y,g.size.width,g.size.height);
			} else {
				ctx.clearRect(g.coord.x,g.coord.y,g.size.width,g.size.height);
			}
		
		},
		
		_getCellGeometry: function(cd) {
			return Shape.Rect.fromNums(cd.x*this.blocksize.width,cd.y*this.blocksize.height,this.blocksize.width,this.blocksize.height);
		}
		
	}
	
});


})();
