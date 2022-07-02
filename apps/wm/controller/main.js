
CKIT.Class.assign('wm.controller.main', {
	
	Has: ['view'],
	
	Onload: function() {
		this.appname = 'wm';
		
		// Take this from the view:
		this.name = this.view.name;
	
		this.children = [];
		this.resolution = this.view.resolution;
		this.windowSpace = Shape.Rect.fromNums(0,0,this.resolution.size.width,this.resolution.size.height-35);
		
		this.topStack = 0;
		this.selectedPid = -1;
		
		this.menuObservers = [];
		
	},

	init: function() {
		
		// Taskbar Event:
		JSAN.use('desktop.exe');
		
		var ws = this.windowSpace;
		desktop.exe.func('proc1', this.view.get(''), {
			geometry: Shape.Rect.fromNums(ws.coord.x,ws.coord.y,ws.size.width,ws.size.height+30)
		});
		this.children.push(1);
		GOLDOS.pid++;
		
		
		var self = this;
		QEvent.add(this.view.taskbar.get(''), 'mousedown', function(e) {
			
			var pid = e.target.getAttribute("pid");
			
			if(e.rightClick ) {
				var cd = new coord(e.page.x,e.page.y);
				
				// ContextMenu:
				if( pid === null ) {
					
					Widget.ContextMenu.create({
						name: self.encap(cd.x+Math.floor(Math.random()*50)),
						menuData: [{
							text:'About Taskbar'
						}],
						screenCoord: cd,
						onmenuclick: function(path) {
							alert("The taskbar is a widget in the GoldOS operating system");	
						}
					}).display();

				} else {
				
					Widget.ContextMenu.create({
						name: self.encap(cd.x+Math.floor(Math.random()*50)),
						menuData: [{
							text:'Close Window'
						}],
						screenCoord: cd,
						onmenuclick: function(path) {
							self.closeWindow(pid);	
						}
					}).display();
					
				}
				
			} else {
		
				if( pid === null ) { return 0; }
				
				var mywindow = self.get("window" + pid);
				if( mywindow.style.display === 'none' ) {
					mywindow.style.display = 'block';
				} else {
					mywindow.style.display = 'none';
				}
			
			}
			
			
		});
		
		// Programs Menu Event:
		var elem = this.get('pmenu');
		this.pmenu = {
			selected: false,
			hasBeenClicked: false
		};
		
		QEvent.add(elem, 'mousedown', function(e){
			if( e.rightClick ) {
				var cd = new coord(e.page.x,e.page.y);
				
				Widget.ContextMenu.create({
					name: self.encap(cd.x+Math.floor(Math.random()*50)),
					menuData: wm.controller.main.menu,
					screenCoord: cd,
					onmenuclick: function(path){
						window['proc0'].menuClick(path);
					}
				}).display();
				
				return;
			}
			
			if( self.pmenu.hasBeenClicked == false ) {
				JSAN.use('Widget.TreeView.YAHOO');
				self.pmenu.hasBeenClicked = true;
				
				var oelem = document.createElement("div");
				Shape.Rect.fromNums(0,self.windowSpace.coord.y,225,self.windowSpace.size.height).setElementPosition(oelem);
				oelem.style.backgroundColor = "#EEEEEE";
				oelem.style.position = "absolute";
				oelem.setAttribute("id", self.encap('ptv'));
				self.get('').appendChild(oelem);	
				
				Widget.TreeView.YAHOO.create(oelem, wm.controller.main.menu, self.name);
			}
			
			if( self.pmenu.selected === false ) {
				self.get('ptv').style.display = 'block';
				self.pmenu.selected = true;
				elem.setAttribute("class", "Programs_Menu_Selected");
			} else {
				self.get('ptv').style.display = 'none';
				self.pmenu.selected = false;
				elem.setAttribute("class", "Programs_Menu_Unselected");
			}
		});
		
		QEvent.add(this.get('computerTarget'), 'mousedown', function(e) {
				if( e.rightClick ) {

					var cd = new coord(e.page.x,e.page.y);
					
					Widget.ContextMenu.create({
						name: self.encap(cd.x+Math.floor(Math.random()*50)),
						menuData: wm.controller.main.systemMenu,
						screenCoord: cd,
						onmenuclick: function(path) {
							if( path == "Administration/Taskmgr" ) {
								self.loadApp("taskmgr");
							} else if( path == "Accessibility/Osk") {
								self.loadApp("osk");
							} else if( path == "About GoldOS" ) {
								alert("GoldOS is a JavaScript Operating System.");
							} else if( path == "Preferences" ) {
								alert("Preferences is in Development");
							} else if( path == "Tasks/Log Out" ) {
								self.closeWindow(0);	
							}
						}
					}).display();
					
				}
		});
		
		QEvent.add(this.get('placesTarget'), 'mousedown', function(e) {
			
			if( e.rightClick ) {
				var cd = new coord(e.page.x,e.page.y);
				
				Widget.ContextMenu.create({
					name: self.encap(cd.x+Math.floor(Math.random()*50)),
					screenCoord: cd,
					
					menuData: wm.controller.main.placesMenu,
					onmenuclick: function(path) {
						
						if( path == "Home" ) {
							self.loadApp("filemgr", {url:"/home/"});	
						} else if( path == "Documents" ) {
							self.loadApp("filemgr", {url:"/home/jhuni/Documents/"});	
						} else {
							self.loadApp("filemgr");
						}
						
					}
				}).display();
			}
			
		});
		
		QEvent.add(this.get('trashTarget'), 'mousedown', function(e) {
			
			if( e.rightClick ) {
				var cd = new coord(e.page.x,e.page.y);
				
				Widget.ContextMenu.create({
					name: self.encap(cd.x+Math.floor(Math.random()*50)),
					screenCoord: cd,
					
					menuData: wm.controller.main.trashMenu,
					onmenuclick: function(path) {
						alert(path);
					}
				}).display();
			}	
			
		});
		
	},
	
	menuClick: function(path) {
		
		var spaces = path.split('/');
		
		if( spaces.length > 1 ) {
			this.loadApp(spaces[1].toLowerCase() );
		}
		
	},
	
	resize: function(newGeometry) {
		
	},

	keypress: function(e) {
		
		if( this.selectedPid != -1 ) {
			window["proc" + this.selectedPid].keypress(e);	
		}
		
	},
	
	
	
	
	/** Utility functions **/
	changeTaskSet: function(pid, bool) {
		
		// Desktop is a special case
		if( pid != 1 ) {
			this.view.taskbar.changeTaskSet(pid,bool);
		}
		
		for( var i = 0; i < this.children.length; i++ ) {
			var child = window["proc"+this.children[i]];
			if( child.appname === 'taskmgr' ) {
				child.view.changeTaskSet(pid,bool);
			}
		}
		
	},

	loadApp: function(appName, profileData) {
		
		// Use the application:
		JSAN.use(appName + '.exe');
		
		this.executeApp(window[appName].exe, appName, profileData);
		
	},
	
	executeApp: function(app, appName, profileData) {
		
		// Determine the profileData:
		if( typeof profileData == "undefined" ) {
			profileData = {};
		}
		
		// Determine the Geometry:
		var sz = this.resolution.size;
		var width = Math.round(sz.width/1.5);
		var height = Math.round(sz.height/1.5);
		profileData.geometry = Shape.Rect.fromNums(0,0,width,height);
		
		
		var pid = GOLDOS.pid;
		
		var len = this.children.length;
		
		var myWindow = this.view.createWindow(this.view.get(''), Shape.Rect.fromNums(50*(len+1)+200,40*(len+1)+25,width,height), pid, appName);
		
		app.func('proc' + pid, myWindow.get('body'), profileData);
		
		this.children.push(pid);
		this.changeTaskSet(pid,true);
		GOLDOS.pid++;
		this.moveToTop(pid);
		
	},

	moveToTop: function(pid) {
		
		this.get('window' + pid).style.zIndex = (this.topStack++);
		var obj = window['proc' + pid];
		var appname = obj.appname;
		
		for( var i = 0, l = this.menuObservers.length; i < l; i++ ) {
			var menu = this.menuObservers[i];
			menu.set( 'data', window[appname].controller.main.menu );
			menu.associatedName = 'proc'+pid;
		}
		
		if( this.selectedPid != -1 && pid != this.selectedPid ) {
			this.view.windows[this.selectedPid].titlebar.setSelected(false);
		}	
		
		var cda = this.view.windows[pid].titlebar;
		if( cda.selected === false ) {
			cda.setSelected(true);
		}
		
		this.selectedPid = pid;
		this.view.taskbar.setSelected(pid);
		
	},

	closeWindow: function(pid) {
		
		// Window Manager Special Case:
		if( pid == 0 ) {
			for( var i = 0, l = this.children.length; i < l; i++ ) {
				this.closeWindow(this.children[i]);
			}	
			// Remove the content:
			this.get('').parentNode.removeChild(this.get(''));
			return;
		}
		
		// Desktop special case:
		if( pid == 1 ) {

			this.view.get('').removeChild(window['proc'+pid].view.get(''));

		} else {
		
			// Delete process data:
			delete window['proc' + pid];
			
			// Remove the window from the DOM if it is a window:
			this.view.windows[pid].destroy();
			delete this.view.windows[pid];
			
		}
		
		// Remove the specified process from the children:
		for( var i = 0, l = this.children.length; i<l; i++ ) {
			if( this.children[i] == pid ) { 
				this.children.splice(i,1);
				break;
			}	
		}
		
		// Recognize that it isn't a child anymore:
		this.changeTaskSet(pid, false);
		
	},

	maximizeWindow: function(pid) {
		var g = this.windowSpace.byval();
		g.size.width -= 6;

		this.view.windows[pid].resize(g);
		window['proc' + pid].resize(Shape.Rect.fromNums(0,0,g.size.width,g.size.height-50)  );
	},

	alert: function(text) {
		
		this.executeApp(wm.alert.exe, 'wm', {'text': text});
		
	},
	
	
	
	
	/** Common Utilities: **/
	encap: function() {
		return( this.name + arguments[0] );
	},

	decap: function(value) {
		return( value.substr(this.name.length) );
	},

	get: function(value) {
		return(  this.view.get(value) );	
	}
	/** End Common Utilities **/
	

});





alert = function(text) {
	window["proc0"].alert(text);
};

GOLDOS.Executable.assign("wm.alert.exe", {
	
	func: function(pid, container, profile) { 
		
		container.setAttribute("style", "padding: 10px;");
		profile.text = profile.text.replace(/\n/g, "<br/>");
		container.innerHTML += "<img src='./apps/wm/view/Images/_alt/z1/alert.png' style='float:left;'/>" + "<p>" + profile.text + "</p>";
		
		window[pid] = {
			appname: "wm",
			menuClick: function(path) {
				window["proc0"].menuClick(path);
			}
		};
		
		
	}
	
});












CKIT.Utils.Base.assign('wm.controller.main.menu', [
	
	{text: 'Accessories', icon: './apps/wm/view/Images/_alt/z1/applications-accessories.png', children: [
		{text:'Textpad', icon: './apps/textpad/view/Images/_alt/z1/icon.png'}
	]},
	
	{text:'Games', icon: './apps/wm/view/Images/_alt/z1/applications-games.png', children: [
		{text: 'Checkers', icon:'./apps/checkers/view/Images/_alt/z1/icon.png'},
		{text: 'Chess', icon: './apps/chess/view/Images/_alt/z1/icon.png'},
		{text: 'Colorlines', icon:'./apps/colorlines/view/Images/_alt/z1/icon.png'},
		{text: 'Gnometris', icon:'./apps/gnometris/view/Images/_alt/z1/icon.png'},
		{text: 'Goban', icon:'./apps/goban/view/Images/_alt/z1/icon.png'},
		{text: 'Gnect', icon:'./apps/gnect/view/Images/_alt/z1/icon.png'},
		{text: 'Minesweeper', icon:'./apps/minesweeper/view/Images/_alt/z1/icon.png'},
		{text: 'Sudoko', icon:'./apps/sudoko/view/Images/_alt/z1/icon.png'},
		{text: 'Tictactoe', icon:'./apps/tictactoe/view/Images/_alt/z1/icon.png'},
		{text: 'Awmap'}
	]},
	
	{text:'Programming', icon: './apps/wm/view/Images/_alt/z1/applications-programming.png', children: [
		{text: 'Podviewer', icon:'./apps/podviewer/view/Images/_alt/z1/icon.png'}
	]}
	
]);

CKIT.Utils.Base.assign('wm.controller.main.systemMenu', [
	{text:'Preferences'},
	{text:'Administration', icon: './apps/wm/view/Images/_alt/z1/preferences-system.png', children: [
		{text: 'Taskmgr', icon:'./apps/taskmgr/view/Images/_alt/z1/icon.png'},
	]},
	{text:'Accessibility', icon: './apps/wm/view/Images/_alt/z1/preferences-desktop-accessibility.png', children: [
		{text: 'Osk', icon: './apps/osk/view/Images/_alt/z1/icon.png'}
	]},
	{text:'Tasks', children: [
		{text:'Log Out'}
	]},
	{text:'----'},
	{text:'About GoldOS'},
]);

CKIT.Utils.Base.assign('wm.controller.main.placesMenu', [

	{text:'Home'},
	{text:'Documents'},
	{text:'Trash'},
	{text:'----'},
	{text:'File Manager', icon: './apps/filemgr/view/Images/_alt/z1/icon.png'}

]);

CKIT.Utils.Base.assign('wm.controller.main.trashMenu', [

	{text:'Trash'}

]);
