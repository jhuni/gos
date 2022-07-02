JSAN.use('Canvas.TextFunctions');
JSAN.use('GOLDOS.HTMLView');
JSAN.use('QEvent');
JSAN.use('wm.view.std.ContextMenu');
JSAN.use('wm.view.canvas.Window');

CKIT.Class.assign('wm.view.canvas.controller', {
	
	Has: ['name', 'geometry'],
	
	Extends: [GOLDOS.HTMLView],
	
	Onload: function() {
		
		this.menusys = Widget.MenuBar;
		this.resolution = Shape.Rect.fromNums(0,0,this.geometry.size.width,this.geometry.size.height);
		Widget.ContextMenu.resolution = this.resolution;
		
		this.windows = {};
		
	},
	
	display: function(parentContainer) {
		
		var container = this.createRoot();
		parentContainer.appendChild(container);
		Widget.ContextMenu.container = this.get('');
		
		var res = this.resolution;
				
		/** Computer Menu **/
		var computerTarget = document.createElement("div");
		Shape.Rect.fromNums(0,0,32,32).setElementPosition(computerTarget);
		computerTarget.setAttribute("class", "computerTarget");
		computerTarget.setAttribute( "id", this.encap("computerTarget") );
		computerTarget.style.position = "absolute";
		computerTarget.innerHTML = "<img style='width:100%;height:100%;' src='./apps/wm/view/Images/_alt/z1/computer-target.png' />";
		container.appendChild(computerTarget);
		
		/** Places Target **/
		var placesTarget = document.createElement("div");
		Shape.Rect.fromNums(res.size.width-34,0,32,32).setElementPosition(placesTarget);
		placesTarget.setAttribute("class", "placesTarget");
		placesTarget.setAttribute( "id", this.encap("placesTarget") );
		placesTarget.style.position = "absolute";
		placesTarget.innerHTML = "<img style='width:100%;height:100%;' src='./apps/wm/view/Images/_alt/z1/places-target.png' />";
		container.appendChild(placesTarget);
		
		/** Programs Menu **/
		var obj = document.createElement("div");
		Shape.Rect.fromNums(0,res.size.height+res.coord.y-32-2,32,32).setElementPosition(obj);
		obj.setAttribute("class", "Programs_Menu_Unselected");
		obj.setAttribute("id", this.encap('pmenu'));
		obj.style.position = "absolute";
		obj.innerHTML = "<img style='height:30px; width: 30px; float:left;' src='./apps/wm/view/Images/_alt/z1/applications-target.png' />";
		container.appendChild(obj);

		/** Trash Target **/
		var trashTarget = document.createElement("div");
		Shape.Rect.fromNums(res.coord.x+res.size.width-34,res.size.height+res.coord.y-32-2,32,32).setElementPosition(trashTarget);
		trashTarget.setAttribute("class", "trashTarget" );
		trashTarget.setAttribute("id", this.encap('trashTarget'));
		trashTarget.style.position = "absolute";
		trashTarget.innerHTML = "<img style='height:100%;width:100%;' src='./apps/wm/view/Images/_alt/z1/trash-target.png' />";
		container.appendChild(trashTarget);
		
		/** Taskbar **/
		// Calculate where to put the Taskbar:
		var tbgeometry = Shape.Rect.fromNums(res.coord.x+33,res.size.height+res.coord.y-32-2, res.size.width-69,32);	
		
		// Place The Taskbar:
		this.taskbar = new wm.view.std.Taskbar(this.encap("taskbar"), tbgeometry);
		this.taskbar.display(container);
		
	},
	
	createWindow: function(container,geometry,pid, appName) {
		
		this.windows[pid] = new wm.view.canvas.Window(this.encap('window'+pid),geometry,pid,appName, window[this.name]);
		var mywindow = this.windows[pid];
		
		mywindow.display(container);
		
		var crtl = window[this.name];
		QEvent.add(mywindow.root, 'click', function() {
			crtl.moveToTop(pid);
		});
		
		return mywindow;
	}
	
});





/* Taskbar widget: */
CKIT.Class.assign('wm.view.std.Taskbar', {
	
	Has: ['name', 'geometry'],
	
	Extends: [GOLDOS.HTMLView],
	
	Onload: function() {
		this.selectedPid = -1;
	},
	
	display: function(container) {
		
		var taskbar = document.createElement("div");
		taskbar.setAttribute("id", this.encap(''));
				
		taskbar.style.position = "absolute";
		taskbar.setAttribute("class", "Taskbar");
		this.geometry.setElementPosition(taskbar);
		
		// Append it:
		container.appendChild(taskbar);
		
	},
	
	changeTaskSet: function(pid, bool) {
		
		if( bool ) {
			var taskbutton = document.createElement("button");
			taskbutton.setAttribute("id", this.encap(pid));
			taskbutton.setAttribute("class", "unselected");
			
			taskbutton.setAttribute("pid", pid);
			taskbutton.setAttribute("title", "Task Button");
			taskbutton.style.height = this.geometry.size.height;
			
			var appname = window['proc'+pid].appname;
			taskbutton.innerHTML = "<img style='float:left;' height='18' width='18' src='./apps/" + appname + "/view/Images/_alt/z1/icon.png'></img> &nbsp;" + appname;
			
			// Append It:
			this.get('').appendChild(taskbutton);
		} else {
			this.get('').removeChild( this.get(pid) );
			if(this.selectedPid === pid ) {
				this.selectedPid = -1;
			}
		}
		
	},
	
	setSelected: function(pid) {
		
		this.get(pid).setAttribute("class", "selected");
		
		if( this.selectedPid != -1 && this.selectedPid != pid ) {
			this.get(this.selectedPid).setAttribute("class", "unselected");	
		}
		
		this.selectedPid = pid;
		
	}
	
});
