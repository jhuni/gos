/*jsan __header__ */

JSAN.use('CKIT');
JSAN.use('QEvent');

/*jsan __end__ */

Joose.Class('GOLDOS.CanvasView', {
	
	constructor: function(name) {
		this.name = name;
	},
	
	has: {
		name: {}
	},
	
	methods: {
	
		display: function(container) {
			var mycanvas = document.createElement('canvas');
			mycanvas.setAttribute("id", this.encap(''));
			mycanvas.setAttribute("width", this.geometry.size.width);
			mycanvas.setAttribute("height", this.geometry.size.height);
			container.appendChild(mycanvas);
		
			// If Canvas is going to be rendered as VML then we need to do the following:
			if( typeof G_vmlCanvasManager != 'undefined' ) {
				G_vmlCanvasManager.initElement(mycanvas);
				
				CanvasRenderingContext2D.prototype.clearRect = function(x,y,width,height) {
					this.fillStyle = "#FFFFFF";
					this.fillRect(x,y,width,height);
				}
			}
			
			this.ctx = this.get('').getContext('2d');
			this.draw();
			this.root = mycanvas;
			
		},
		
		on: function(eventName, func) {
			
			var root = this.root;
			QEvent.add(root, eventName,function(e) {
				e.cd = coord.getFromPageElement(root).inverse().addCoord( new coord(e.page.x,e.page.y) );
				func(e);
			});
			
		},
		
		redisplay: function() {
			var container = this.get('').parentNode;
			container.removeChild(this.get(''));
			this.display(container);
		},
		
		encap: function() {
			return(   this.name + arguments[0]  );
		},

		decap: function(value) {
			return( value.substr(this.name.length) );
		},

		get: function() {
			return( document.getElementById(this.encap(arguments[0])) );	
		}
				
	}
	
});

