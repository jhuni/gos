JSAN.use('QEvent');
JSAN.use('GOLDOS.HTMLView');

CKIT.Class.assign('taskmgr.view.std.controller', {

	Has: ['name', 'geometry'],
	
	Extends: [GOLDOS.HTMLView],
	
	display: function(container) {
		
		var root = this.createRoot();
		root.style.height = this.geometry.size.height;
		root.innerHTML = "<table border='1' cellpadding='5' style='float:left;' id='" + this.encap('table') + "'></table>";
		container.appendChild(root);
		
	},
	
	attachEvents: function(crtl) {
		
		var view = this;
		QEvent.add(this.get('table'), 'mousedown', function(e) {
			var elem = e.target;
			if( elem.tagName.toLowerCase() != 'td' ) {
				return;
			}
			
			if( e.rightClick ) {
				// Essential Variables:
				var pid = parseInt(view.decap(elem.parentNode.getAttribute("id")));
				var cd = new coord(e.page.x,e.page.y);
				
				// Display The Associated Sub Menu:
				Widget.ContextMenu.create({
					name: view.encap(cd.x+Math.floor(Math.random()*50)),
					menuData: [{
						text:'Kill Process'
					}],
					screenCoord: cd,
					onmenuclick: function(path) {
						window['proc0'].closeWindow(pid);
					}
				}).display();
			}
			
		});
		
	},
	
	changeTaskSet: function(pid, bool) {
		
		if( bool === true ) {
			
			var appname = window['proc'+pid].appname;
			var myhtml = '';
			myhtml += "<tr id='" + this.encap(pid) + "'>";
			myhtml += "<td><img style='width: 40px;height:40px;' src='./apps/" + appname + "/view/Images/_alt/z1/icon.png' /></td>";
			myhtml += "<td>" + appname + "</td>";
			myhtml += "<td>" + pid + "</td>";
			myhtml += "</tr>";
			
			this.get('table').innerHTML += myhtml;
			
		} else {
			
			var elem = this.get(pid);
			elem.parentNode.removeChild(elem);
		
		}
		
	}

});

