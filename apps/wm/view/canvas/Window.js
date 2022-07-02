// Requires: CKIT, coord, tbsize, Shape.Rect
JSAN.use('GOLDOS.HTMLView');

CKIT.Class.assign('wm.view.canvas.Window', {
	
	Has: ['name', 'geometry', 'pid', 'appName', 'crtl'],
	
	Extends: [GOLDOS.HTMLView],
	
	display: function(container) {
		var geometry = this.geometry,pid=this.pid,appName=this.appName;
		
		var myWindow = this.createRoot();
		myWindow.setAttribute("style", "background-color: white; position: absolute; border: 3px groove #888888;");
		this.root = myWindow;
		
		var innerHTML = '<div style="float:left;" id="' + this.encap('top') + '"></div>';
		innerHTML += '<div id="' + this.encap('body') + '"></div>';	
		myWindow.innerHTML = innerHTML;
		
		myWindow.style.width = geometry.size.width + "px";
		geometry.coord.setElementPosition(myWindow);
		
		container.appendChild(myWindow);
		
		
		this.get('top').innerHTML += '<canvas id="' + this.encap('titlebar') + '" width="' + geometry.size.width + '" height="30"></canvas>';
		var canvas = this.get('titlebar');
		
		// Draw and create the titlebar:
		var ctx = canvas.getContext('2d');
		this.titlebar = new wm.view.canvas.TitleBar(ctx, Shape.Rect.fromNums(0,0,geometry.size.width,30), appName);
		var cda = this.titlebar;
		cda.draw();
		
		// Attach events:
		var crtl = this.crtl;
		var self = this;
		
		// mousedown:
		canvas.onmousedown = function(e) {
			
			// Get the coordinate:
			var cd = coord.getFromPageElement(canvas).inverse().addCoord( coord.getFromPageEvent(e) );
			
			// Right Click System:
			if( e.which === 3 ) {
				
				var menudata = [];
				
				if( cda.closeButton.isContained(cd) ) {
					
					menudata = [
						{text:'Close'},
						{text:'Close All'}		
					];
					
				} else if( cda.maximizeButton.isContained(cd) ) {
					
					menudata = [
						{text:'Maximize'},
						{text:'Resize'}
					];
					
				} else if( cda.minimizeButton.isContained(cd) ) {
					
					menudata = [
						{text:'Minimize'},
						{text:'Minimize All'}
					];
					
				} else {
					
					var myapp = window["proc"+pid];
					
					Widget.ContextMenu.create({
						
						name: self.encap(Math.floor(Math.random()*50)),
						screenCoord: coord.getFromPageEvent(e),
						
						menuData: window[myapp.appname].controller.main.menu,
						onmenuclick: function(path) {
							myapp.menuClick(path);
						}
						
					}).display();
					
					return;
				
				}
				
				// Create the menu:
				Widget.ContextMenu.create({
					name: self.encap(Math.floor(Math.random()*50)),
					menuData: menudata,
					screenCoord: coord.getFromPageEvent(e),
					onmenuclick: function(path) {
						window["proc0"].closeWindow(pid);	
					}
				}).display();
				
			} else {
			
				if( cda.closeButton.isContained(cd) ) {
					cda.closeButton.onmousedown();
				} else if( cda.maximizeButton.isContained(cd) ) {
					cda.maximizeButton.onmousedown();
				} else if( cda.minimizeButton.isContained(cd) ) {
					cda.minimizeButton.onmousedown();
				} else {
					Widget.DND.drag( myWindow, e );
				}
				
			}
			
		};
		
		// onmousemove:
		canvas.onmousemove = function(e){
			var cd = coord.getFromPageElement(canvas).inverse();
			cd.addCoord( coord.getFromPageEvent(e) );
			
			// Look for a child that contains this coordinate:
			for( var i = 0, l = cda.children.length; i < l; i++ ) {
				var child = cda.children[i];
				if( child.isContained(cd) ) {
					child.onmouseover();	
				}
					
			}
			
		};

		// onmouseup:
		canvas.onmouseup = function(e){
			var cd = coord.getFromPageElement(canvas).inverse();
			cd.addCoord( coord.getFromPageEvent(e) );
			
			if( cda.closeButton.isContained(cd) ) {
				crtl.closeWindow(pid);
			} else if( cda.maximizeButton.isContained(cd) ) {
				crtl.maximizeWindow(pid);
			} else if( cda.minimizeButton.isContained(cd) ) {
				self.minimize();
			}
			
		};
		
		// return it:
		return this;
	},
	
	destroy: function() {
		this.get('').parentNode.removeChild(this.get(''));
	},
	
	minimize: function() {
		this.root.style.display = 'none';	
	},
	
	unminimize: function() {
		this.root.style.display = 'block';
	},
	
	resize: function(newGeometry) {
		
		newGeometry.setElementPosition(this.root);
		this.get('titlebar').setAttribute("width", newGeometry.size.width);
		this.titlebar.resize( Shape.Rect.fromNums(0,0,newGeometry.size.width,30) );
		
	}
	
});








CKIT.Class.assign('wm.view.canvas.TitleBar', {
	
	Has: ['ctx', 'geometry', 'text'],
	
	Onload: function() {
		this.selected = true;
		
		var ctx = this.ctx;
		var width = this.geometry.size.width;
		
		// Create The Children:
		this.closeButton = new wm.view.canvas.CloseButton(    ctx, Shape.Rect.fromNums(width-26, 2, 25, 25) );
		this.minimizeButton = new wm.view.canvas.MinimizeButton( ctx, Shape.Rect.fromNums(width-26*2, 2, 25, 25) );
		this.maximizeButton = new wm.view.canvas.MaximizeButton( ctx, Shape.Rect.fromNums(width-26*3, 2, 25, 25) );
	
		// Children Array:
		this.children = [this.minimizeButton, this.maximizeButton, this.closeButton];
	
	},
	
	draw: function() {
		var ctx = this.ctx;
		
		var x = this.geometry.coord.x;
		var y = this.geometry.coord.y;
		var width = this.geometry.size.width;
		var height = this.geometry.size.height;
		
		// Create gradients
		var lingrad = ctx.createLinearGradient(0,0,0,height);
		if( this.selected === true ) {
			lingrad.addColorStop(0, '#5d8bb7');
			lingrad.addColorStop(0.5, '#00afdb');
			lingrad.addColorStop(1, '#5d8bb7');
		} else {
			lingrad.addColorStop(0,'#AAAAAA');
			lingrad.addColorStop(0.5,'#EEEEEE');
			lingrad.addColorStop(1,'#AAAAAA');
		}
		
		ctx.fillStyle = lingrad;
		ctx.fillRect(x,y,width,height);

		// Text label:
		Canvas.TextFunctions.draw(ctx, Canvas.TextFunctions.letters, 15, 50, 20, this.text);
		
		// Draw Children:
		this.closeButton.draw();
		this.minimizeButton.draw();
		this.maximizeButton.draw();
		
	},
	
	resize: function(newGeometry) {
		this.geometry = newGeometry;
		this.Onload();
		this.draw();	
	},
	
	setSelected: function(selected) {
		this.ctx.clearRect(this.geometry.coord.x,this.geometry.coord.y,this.geometry.size.width,this.geometry.size.height);
		this.selected = selected;
		this.draw();
	}
	
});





CKIT.Class.assign('wm.view.canvas.MinimizeButton', {
	
	Has: ['ctx', 'geometry'],
	
	Onload: function() {
		this.state = 'normal';
	},
	
	isContained: function(cd) {
		return this.geometry.containsCoord(cd);
	},

	draw: function(){
		
		var color = {
			"normal": "#FFFF00",
			"hover": "#FFFFCC",
			"disabled": "#888888",
			"active": "#000000"
		}[this.state];
		
		var ctx = this.ctx;
		var g = this.geometry;

		ctx.save();
		ctx.translate(g.coord.x,g.coord.y);
		ctx.scale(g.size.width/50,g.size.height/50);

		var lineargradient = ctx.createLinearGradient(0,0,0,50);
		lineargradient.addColorStop(0,color);
		lineargradient.addColorStop(1,'#333300');
	
		ctx.fillStyle = lineargradient;

		ctx.beginPath();
		ctx.arc(25,25,23,0,Math.PI*2,false);
		ctx.fill();
		ctx.stroke();
	
		ctx.fillStyle = "#ffffff";

		ctx.beginPath();
		ctx.moveTo(20,10);
		ctx.lineTo(30,10);
		ctx.lineTo(30,25);
		ctx.lineTo(20,25);
		ctx.lineTo(20,10);
		ctx.moveTo(25,40);
		ctx.lineTo(36,25);
		ctx.lineTo(14,25);
		ctx.lineTo(25,40);
		ctx.fill();

		ctx.restore();
		
	},

	onmouseover: function() {
		if( this.state != 'active' ) {
			this.state = 'hover';
			this.draw();
		}
	},
	
	onmousedown: function() {
		this.state = 'active';
		this.draw();	
	}

});

CKIT.Class.assign('wm.view.canvas.MaximizeButton', {

	Has: ['ctx', 'geometry'],
	
	Onload: function() {
		this.state = 'normal';
	},
		
	isContained: function(cd) {
		return this.geometry.containsCoord(cd);
	},
	
	draw: function() {
		
		var g = this.geometry;
		var ctx = this.ctx;
		
		var color = {
			"normal": "#00FF00",
			"hover": "#AAFFAA",
			"disabled": "#888888",
			"active": "#000000"
		}[this.state];

		ctx.save();
		ctx.translate(g.coord.x,g.coord.y);
		ctx.scale(g.size.width/50,g.size.height/50);
		
		var lineargradient = ctx.createLinearGradient(0,0,0,50);
		lineargradient.addColorStop(0,color);
		lineargradient.addColorStop(1,'#000000');
	
		ctx.fillStyle = lineargradient;

		ctx.beginPath();
		ctx.arc(25,25,23,0,Math.PI*2,false);
		ctx.fill();
		ctx.stroke();
	
		ctx.fillStyle = "#ffffff";
		ctx.beginPath();
		ctx.moveTo(20,40);
		ctx.lineTo(30,40);
		ctx.lineTo(30,25);
		ctx.lineTo(20,25);
		ctx.lineTo(20,40);

		ctx.moveTo(25,10);
		ctx.lineTo(36,25);
		ctx.lineTo(14,25);
		ctx.lineTo(25,10);
		ctx.fill();
		
		ctx.restore();

	},
	
	onmouseover: function() {
		if( this.state != 'active' ) {
			this.state = 'hover';
			this.draw();
		}
	},
	
	onmousedown: function() {
		this.state = 'active';
		this.draw();	
	}
	
});

CKIT.Class.assign('wm.view.canvas.CloseButton', {
	
	Has: ['ctx', 'geometry'],
	
	Onload: function() {
		this.state = 'normal';
	},
	
	isContained: function(cd) {
		return this.geometry.containsCoord(cd);
	},
	
	draw: function() {
		
		var ctx = this.ctx;
		var x = this.geometry.coord.x;
		var y = this.geometry.coord.y;
		var width = this.geometry.size.width;
		var height = this.geometry.size.height;
		
		var color = {
			"normal": "#ff2222",
			"hover": "#FFAA88",
			"disabled": "#888888",
			"active": "#880000"
		}[this.state];

		ctx.save();
		ctx.translate(x,y);
		ctx.scale(width/50,height/50);

		var lineargradient = ctx.createLinearGradient(0,0,0,50);
		lineargradient.addColorStop(0,color);
		lineargradient.addColorStop(1,'#000000');

		ctx.beginPath();
		ctx.fillStyle = lineargradient;
		ctx.arc(25,25,23,0,Math.PI*2,false);
		ctx.fill();
		ctx.stroke();

		
		ctx.strokeStyle = "#ffffff";
		ctx.lineWidth = '4';
		ctx.beginPath();
		ctx.moveTo(25+Math.sin(Math.PI*1.25)*15,25+Math.cos(Math.PI*1.25)*15);
		ctx.lineTo(25+Math.sin(Math.PI*0.25)*15,25+Math.cos(Math.PI*0.25)*15);
		ctx.moveTo(25+Math.sin(Math.PI*0.75)*15,25+Math.cos(Math.PI*0.75)*15);
		ctx.lineTo(25+Math.sin(Math.PI*1.75)*15,25+Math.cos(Math.PI*1.75)*15);
		ctx.stroke();
		
		ctx.restore();

	},
	
	onmouseover: function() {
		if( this.state != 'active' ) {
			this.state = 'hover';
			this.draw();
		}
	},
	
	onmousedown: function() {
		this.state = 'active';
		this.draw();	
	}
	
});
