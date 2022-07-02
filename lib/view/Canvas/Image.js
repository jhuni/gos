JSAN.use('CKIT');
JSAN.use('Shape.Rect');

Joose.Class('Canvas.Image', {
	
	constructor: function(geometry, image) {
		this.geometry = geometry;
		this.image = image;
	},
	
	has: {
		geometry: {},
		image: {}
	},
	
	methods: {
		
		render: function(ctx, ng) {
			
			var geometry = this.geometry;
			
			ctx.save();
			ctx.translate(ng.coord.x-geometry.coord.x,ng.coord.y-geometry.coord.y);
			ctx.scale(1/geometry.size.width*ng.size.width, 1/geometry.size.height*ng.size.height);
			
			this.image(ctx);
			ctx.restore();
			
		}
		
	}
	
});


/*
CKIT.Class.assign('Canvas.Image', {

	Has: ['geometry', 'image'],

	render: function(ctx, ng) {
		
		var geometry = this.geometry;
		
		ctx.save();
		ctx.translate(ng.coord.x-geometry.coord.x,ng.coord.y-geometry.coord.y);
		ctx.scale(1/geometry.size.width*ng.size.width, 1/geometry.size.height*ng.size.height);
		
		this.image(ctx);
		ctx.restore();
		
	}
	
});
*/
