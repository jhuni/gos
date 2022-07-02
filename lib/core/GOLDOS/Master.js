/*jsan __header__ */

JSAN.use('Joose');
JSAN.use('CKIT');
JSAN.use('GOLDOS.Executable');
JSAN.use('Shape.Rect');
JSAN.use('DOM.CoordUtils');
JSAN.use('IO.Simple._Ajax');

/*jsan __end__ */



CKIT.Utils.Base.assign('GOLDOS.Master', {
	
	getApp: function() {
		
		var vals = window.location.toString().split("#");
		
		if( vals.length === 1 ) {
			return '';
		} else {
			return vals[1];
		}
		
	},
	
	setApp: function(myapp) {
		window.location = window.location + "#" + myapp;
		window.location.reload(true);
	},
	
	loadApp: function(app) {
		
		JSAN.use(app + '.exe'); 
	
		var myfunc = function(){};

		if( typeof(window[app]) == 'undefined' ) {
			
			myfunc = function() {
				JSAN.addRepository("./assets/lib/");
				JSAN.use("Widget.SimpleTree");
				JSAN.use("MasterErrorManager");
				
				MasterErrorManager.debugApp('./apps/', './lib/', app);
			}
		
		} else {
			var myapp = window[app]['exe'];

			myfunc = function() {
				var mycontainer = document.getElementById('output');
				
				myapp.func("proc0", mycontainer, {
					geometry: Shape.Rect.fromWindowSize()
				});

				window.onresize = function() {
					window["proc0"].resize(Shape.Rect.fromWindowSize());
				};

				window.oncontextmenu = function() {
					return false;
				};
				
				QEvent.add(window, 'keypress', function(e) {
					window["proc0"].keypress(e);
				});
				
				
				/*
				QEvent.add(window, 'keydown', function(e) {
					if( e.shift && e.key == 'space' ) {
						alert("hi");						
					}
				});
				*/

				GOLDOS.pid++;

			}
		}

		window.onload = function() {
			document.body.setAttribute("class","yui-skin-sam");
			document.body.innerHTML = '<div id="output"></div>';
			
			myfunc();
		}
		
	},
	
	init: function() {
		
		document.title = 'GoldOS';
		
		var appname = GOLDOS.Master.getApp();
		
		if( !appname ) {
			appname = "AppSelector";
			JSAN.addRepository("./assets/lib");
		}
		
		GOLDOS.Master.loadApp(appname);
		
	}
	
});


// Initialize everything:
GOLDOS.Master.init();


