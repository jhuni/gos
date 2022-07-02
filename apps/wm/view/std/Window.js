// Requires: CKIT, coord, tbsize, Shape.Rect
JSAN.use('GOLDOS.HTMLView');

JSAN.use('YAHOO');
JSAN.use('YAHOO.util.Dom');
JSAN.use('YAHOO.util.Event');
JSAN.use('YAHOO.util.Element');

YAHOO.util.Element.prototype.setAttribute = function(key,value) {
	var elem = this._configs.element.value;
	YAHOO.util.Dom.setAttribute(elem,key,value);	
};

CKIT.Class.assign('wm.view.std.Window', {
	
	Has: ['name', 'geometry', 'pid', 'appName', 'crtl'],
	
	Extends: [GOLDOS.HTMLView],
	
	display: function(container) {
		var geometry = this.geometry,pid=this.pid,appName=this.appName;
		
		var myWindow = this.createRoot();
		this.o = new YAHOO.util.Element(myWindow);
		this.o.setAttribute("shittineess", 4);
		
		myWindow.setAttribute("style", "background-color: white; position: absolute; border: 3px groove #888888;");
		
		this.root = myWindow;
		
		var innerHTML = '<div style="float:left;" id="' + this.encap('top') + '"></div>';
		innerHTML += '<div id="' + this.encap('body') + '"></div>';	
		myWindow.innerHTML = innerHTML;
		
		myWindow.style.width = geometry.size.width + "px";
		geometry.coord.setElementPosition(myWindow);
		
		container.appendChild(myWindow);
		
		this.titlebar = new wm.view.std.TitleBar(Shape.Rect.fromNums(0,0,geometry.size.width,30), appName);
		var titlebar = this.titlebar;
		titlebar.display(this.get('top'));
		
		titlebar.root.onmousedown = function(e) {
			Widget.DND.drag(myWindow,e);
		};
		
		// Events:
		var self = this;
		var crtl = this.crtl;
		QEvent.add(titlebar.root, 'click', function(e) {
			var targetClass = e.target.getAttribute("class");
			if(typeof targetClass != "string") { 
				return;
			} else if(targetClass=="CloseButton") {
				crtl.closeWindow(pid);
			}else if(targetClass=="MinimizeButton") {
				self.minimize();
			}else if(targetClass=="MaximizeButton") {
				crtl.maximizeWindow(pid);
			}
		
		});
		
		// return it:
		return this;
	},
	
	minimize: function() {
		this.root.style.display = 'none';	
	},
	
	unminimize: function() {
		this.root.style.display = 'block';
	},
	
	resize: function(newGeometry) {
		
		newGeometry.setElementPosition(this.root);
		this.titlebar.root.style.width = newGeometry.size.width;
		
	}
	
});







// Titlebar:
CKIT.Class.assign('wm.view.std.TitleBar', {
	
	Has: ['geometry', 'text'],
	
	display: function(container) {
		
		this.root = document.createElement("div");
		var root = this.root;
		
		this.geometry.size.setElementSize(root);
		root.innerHTML += '<div style="float:left; font-size: 20px; margin-left: 20px; margin-top: 2px;">' + this.text + '</div>';
		
		// Buttons:
		root.innerHTML += '<button class="CloseButton" style="background-color: red; color: white; float:right; height: 30px;">X</button>';
		root.innerHTML += '<button class="MaximizeButton" style="background-color: green; color: white; float: right; height: 30px;">[]</button>';
		root.innerHTML += '<button class="MinimizeButton" style="background-color: #888800; color: white; float:right; height: 30px;">_</button>';
		
		this.setSelected(true);
		this.selected = true;
		container.appendChild(root);
		
	},
	
	resize: function(newGeometry) {
		newGeometry.size.setElementSize(this.root);
	},
	
	setSelected: function(isSelected) {
		
		var root = this.root;
		if( isSelected ) {
			root.style.backgroundColor = "blue";
			root.style.color = "white";
		} else {
			root.style.backgroundColor = "#EEEEEE";
			root.style.color = "black";
		}
		
		this.selected = isSelected;
		
	}
	
});
