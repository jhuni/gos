/*jsan __header__ */

JSAN.use('QEvent');
JSAN.use('YAHOO');
JSAN.use('YAHOO.util.Dom');
JSAN.use('YAHOO.util.StyleSheet');

(new YAHOO.util.StyleSheet(IO.Simple.slurp("./assets/css/AppSelector.css"))  );

/*jsan __end__ */

GOLDOS.Executable.assign('AppSelector.exe', {

	func: function(pid, container, myargs) {

		var root = document.createElement("div");
		root.setAttribute("class","AppSelector");
		root.setAttribute("id",pid);
		container.appendChild(root);

		var apps = ['awmap', 'checkers', 'chess', 'colorlines', 'gnect', 'gnometris', 'goban', 'minesweeper', 'osk', 'sudoko', 'tictactoe', 'desktop', 'wm','filemgr'];

		root.innerHTML += "<div class='Logo'><img src='./assets/logo.png' width='192' height='192'></img></div>";

		var appArea = document.createElement("div");
		appArea.setAttribute("class","AppArea");
		root.appendChild(appArea);
		
		// Set the click event using event delegation:
		QEvent.add(appArea, 'click', function(e) {
			
			var target = e.target;
			if( target.tagName.toLowerCase() === 'img' ) {
				target = target.parentNode;
			}
			
			// Set the Application:
			GOLDOS.Master.setApp(target.getAttribute("appname"));
		});


		// Create the elements:
		for( var i = 0, l = apps.length; i < l; i++ ) {
			var appname = apps[i].toString();
			var ic = document.createElement("div");
			ic.setAttribute("class", "icon");
			ic.setAttribute("appname", appname);

			QEvent.add(ic, 'mouseover', function(e) {
				YAHOO.util.Dom.setAttribute(e.target, "class", "active");
			});
		
			QEvent.add(ic, 'mouseout', function(e) {
				YAHOO.util.Dom.setAttribute(e.target, "class", "inactive");
			});
	
			if( i % 6 === 0 ) {
				ic.style.clear = 'left';
			}			

			ic.innerHTML += '<img src="./apps/' + appname + '/view/Images/_alt/z1/icon.png" width="50" height="50"></img><br></br>' + appname;			
			appArea.appendChild(ic);				
		}
			
	}
	

} );
