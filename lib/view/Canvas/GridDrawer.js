JSAN.use('CKIT');
JSAN.use('coord');
JSAN.use('Shape.Rect');

CKIT.Utils.Base.assign('Canvas.GridDrawer', {
	drawGrid: function(ctx, geometry, gridSize) {
		var cellsize = new tbsize(geometry.size.width/gridSize.width, geometry.size.height/gridSize.height);
		
		ctx.save();
		ctx.translate(geometry.coord.x,geometry.coord.y);
		
		for( var pos = 0; pos != 2; pos++ ) {
			
			var j = (pos == 0) ? gridSize.width : gridSize.height;
			var factor = (pos == 0) ? cellsize.width : cellsize.height;
			var max = (pos == 0) ? geometry.size.height: geometry.size.width;
			
			for( var i = 0; i <= j; i++ ) {
				ctx.save();
				
				// Emphasize border areas:
				if( i == 0 || i == j ) {
					ctx.lineWidth = '2';
				}
				
				var start = new coord( i*factor, 0);
				var end   = new coord( i*factor, max);
				
				// Switch x and y one the second run.
				if( pos == 1 ) {
					start.switchXY();
					end.switchXY();
				}
				
				ctx.beginPath();
				ctx.moveTo( start.x, start.y);
				ctx.lineTo( end.x,   end.y  );
				ctx.stroke();
				ctx.restore();
			}
		}
		
		ctx.restore();
		
	}
});
