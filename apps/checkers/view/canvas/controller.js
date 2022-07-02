JSAN.use('GOLDOS.CanvasView');
JSAN.use('Canvas.GridDrawer');

(function(){
	
var _getNormalIndexClass = function(view, index) {
	var y = Math.floor(index/view.size.height);
	var myin = index+y;
	return( ((myin%2===0) ? 'cellp1': 'cellp2') );
};

var blackpiece = new Image();
blackpiece.src = './apps/checkers/view/Images/_alt/z1/blackpiece.png';

var redpiece = new Image();
redpiece.src = './apps/checkers/view/Images/_alt/z1/redpiece.png';

var redking = new Image();
redking.src = './apps/checkers/view/Images/_alt/z1/redking.png';

var blackking = new Image();
blackking.src = './apps/checkers/view/Images/_alt/z1/blackking.png';

Joose.Class('checkers.view.canvas.controller', {

	constructor: function() {
		// Handle Arguments:
		CKIT.Utils.Base.extendByPairs(this, [ ['name','size','geometry'], arguments ]);
		
		// Onload:
		var s = this.geometry.size;
		this.blocksize = new tbsize(  Math.floor(s.width/this.size.width), Math.floor(s.height/this.size.height)  );
		
		this.data = Grid.fromRepetition(0, this.size);
	},
	
	has: {
		size: {},
		geometry: {}
	},
	
	isa: GOLDOS.CanvasView,
	
	methods: {
	
		draw: function() {
			Canvas.GridDrawer.drawGrid(this.ctx,this.geometry,this.size);
			
			var view = this;
			this.size.loopGrid( function(cd) {
				view.drawCellBackground(cd); 
			});
		},
		
		attachEvents: function(clickIndex) {
			
			var view = this;
			
			this.on('mousedown', function(e) {
				
				var cd = new coord(Math.floor(e.cd.x/view.blocksize.width), Math.floor(e.cd.y/view.blocksize.height));
				var index = cd.toIndex(view.size.width);
				
				if( index != -1 ) {
					clickIndex( index );    
				}	
				
			});
			
		},

		// Valid values: [0,1,2] 0 == blank
		setIndex: function(index, value) {
			
			var ctx = this.ctx;
			var cd = coord.fromIndex(index,this.size);
			var g = this.getCellGeometry(cd);
			
			if( value === 0 ) {
				this.drawCellBackground(cd);
			} else if( value === 1 ) {
				ctx.drawImage(blackpiece,g.coord.x,g.coord.y,g.size.width,g.size.height);
			} else if( value === 2 ) {
				ctx.drawImage(redpiece,g.coord.x,g.coord.y,g.size.width,g.size.height);
			} else if( value === 3 ) {
				ctx.drawImage(blackking,g.coord.x,g.coord.y,g.size.width,g.size.height);
			} else if( value === 4 ) {
				ctx.drawImage(redking,g.coord.x,g.coord.y,g.size.width,g.size.height);
			}
			
			this.data.setIndex(index,value);

		},

		highlightCell: function(index) {
			var g = this.getCellGeometry( coord.fromIndex(index,this.size) );
			var ctx = this.ctx;
			
			ctx.fillStyle = "#115588";
			ctx.fillRect(g.coord.x,g.coord.y,g.size.width,g.size.height);
			
			this.setIndex(index,this.data.getIndex(index));
			
		},
		
		focusCoord: function(cd) {
			var g = this.getCellGeometry( cd );
			var ctx = this.ctx;

			ctx.strokeStyle = "#880088";
			ctx.lineWidth = '3';
			ctx.strokeRect(g.coord.x+10,g.coord.y+10,g.size.width-20,g.size.height-20);
			
		},

		normalizeCell: function(index) {
			this.resetCoord(coord.fromIndex(index,this.size));
		},
		
		resetCoord: function(cd) {
			var g = this.getCellGeometry(cd);
			
			this.drawCellBackground(cd);
			this.setIndex(cd.toIndex(this.size.width),this.data.get(cd));
		},
		
		
		/* Non-Interface Based*/
		
		drawCellBackground: function(cd) {
			
			var ctx = this.ctx;
			var g = this.getCellGeometry(cd);
			var index = cd.toIndex(this.size.width);
			var myclass = _getNormalIndexClass(this,index);
			
			if( myclass==='cellp1' ) {
				ctx.fillStyle = "white";
			} else {
				ctx.fillStyle = "#eeaa77";	
			}
			
			ctx.fillRect(g.coord.x,g.coord.y,g.size.width,g.size.height);
		},

		getCellGeometry: function(cd) {
			return Shape.Rect.fromNums(cd.x*this.blocksize.width,cd.y*this.blocksize.height,this.blocksize.width,this.blocksize.height);
		}
				
	}


});



})();
