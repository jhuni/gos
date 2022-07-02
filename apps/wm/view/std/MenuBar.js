(function(){
	
JSAN.use('GOLDOS.HTMLView');

/* Widget.MenuBar */
CKIT.Class.assign('Widget.MenuBar', {

	Has: ['name', 'data', 'sz', 'associatedName'],
	
	Extends: [GOLDOS.HTMLView],

	display: function(container) {
		
		var menubar = this.createRoot();
		menubar.setAttribute("class","MenuBar");
		this.sz.setElementSize(menubar);
		
		this.activePath = '';
		this.usedPaths = {};
		
		var self = window[this.name];
		QEvent.add(menubar, 'click', function(e) {
			if( e.target.getAttribute("class") != "MenuBar") {
				self.menuItemClick(e.target);			
			}
		});
		
		QEvent.add(menubar, 'mouseover', function(e) {
			var elem = e.target;
			
			if( elem.getAttribute("class") === "MenuTop" && self.activePath !== '' ) {
				self.set('activePath', elem);
			}
			
		});
		
		this.appendMenuButtons(menubar);
		container.appendChild(menubar);
		
	},
	
	menuItemClick: function(elem) {
		var val = elem.innerHTML;
		
		if( elem.getAttribute("class") === "MenuTop" ) {
			elem.setAttribute("class", "MenuTopActive");
			this.displaySubMenu(val);
			this.activePath = val;
		} else {
			elem.setAttribute("class", "MenuTop");
			this.usedPaths[val].set('isVisible', false);
			this.activePath = '';
		}
	},
	
	appendMenuButtons: function(menubar) {
		for( var i = 0, l = this.data.length; i < l; i++) {
			var text = this.data[i].text;
			var menuTop = document.createElement("div");
			menuTop.setAttribute("class", "MenuTop");
			menuTop.setAttribute("id", this.encap(text));
			menuTop.setAttribute("menuindex", i);
			menuTop.innerHTML = text;
			menubar.appendChild(menuTop);
		}
	},
	
	displaySubMenu: function(menuPath) {
		if( this.usedPaths[menuPath] ) {
			this.usedPaths[menuPath].set('isVisible', true);
		} else {
			var elem = this.get(menuPath);
			var cd = coord.getFromPageElement( elem );
			var sz = tbsize.getFromPageElement( elem );
			cd.y += sz.height;
			
			var smdata = this.data[this.get(menuPath).getAttribute("menuindex")].children;
			var assoc = window[this.associatedName];
			
			// Important: show the sub menu:
			this.usedPaths[menuPath] = Widget.ContextMenu.create({
				name: this.encap("SubMenu"+menuPath),
				menuData: smdata,
				screenCoord: cd,
				currentHierarchy: menuPath + '/',
				onmenuclick: function(path) {
					assoc.menuClick(path);
				}
			}).display();
			
		}
	},
	
	set: function(key,value) {
		
		if( key === 'data' ) {
			this.data = value;
			
			var menubar = this.get('');
			menubar.innerHTML = '';
			
			this.appendMenuButtons(menubar);
			
			// Eliminate used paths:
			for( i in this.usedPaths ) {
				this.usedPaths[i].destroy();
				delete Widget.SubMenu.instances[this.encap('SubMenu'+i)];
			}
			
			this.usedPaths = {};
			this.activePath = '';
			
		} else if( key === 'activePath' ) {
			
			// Hide the currently active display:
			this.get(this.activePath).setAttribute("class","MenuTop");
			this.usedPaths[this.activePath].set('isVisible', false);
			
			// Move to the new display:
			var elem = value;
			elem.setAttribute("class", "MenuTopActive");
			this.activePath = elem.innerHTML;
			this.displaySubMenu(elem.innerHTML);
			
		}
		
	}

}); // End Prototype



Widget.MenuBar.extend( {
			
	create: function(container, pid, sz, mydata, associatedPid ) {

		window[pid] =  new Widget.MenuBar( pid, mydata, sz, associatedPid );
		window[pid].display( container );

	}

});





})();
