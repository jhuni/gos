/*jsan __header__ */

JSAN.use('CKIT');
JSAN.use('JSLINT');
JSAN.use('YAHOO');
JSAN.use('YAHOO.util.StyleSheet');

(new YAHOO.util.StyleSheet(IO.Simple.slurp("./assets/css/MasterErrorManager.css"))  );

/*jsan __end__ */



CKIT.Utils.Base.assign('MasterErrorManager', {
	
	debugApp: function(appdir, libdir, appname) {
		
		// Place the top errors:
		document.getElementById('output').innerHTML += 'Executable load error.  &nbsp;&nbsp;&nbsp;(' + appname + ')';
		
		// Evaluate with JSLINT:
		eval('var mymeta = ' + IO.Simple.slurp(appdir + appname + '/META.json'));
		var mydist = mymeta.provides;

		document.body.innerHTML += ("<h1>JSLINT Test Suite</h1>");
		document.body.innerHTML += ("<div class='Section'>Requires:</div>");
		
		MasterErrorManager.debugDist(libdir, mymeta.requires);
		
		document.body.innerHTML += ("<div class='Section'>Provides:</div>");
		
		MasterErrorManager.debugDist(appdir, mydist);
		
	},
	
	debugDist: function(directory, distribution) {
		
		var myload = distribution;

		var j = myload.length;
		for( i = 0; i < j; i++ ) {

			var mystring = MasterErrorManager.getJSFromPackage(distribution[i]);
			JSLINT(mystring);

			var myreport = MasterErrorManager.reportJSLINT(distribution[i], JSLINT.errors);

			document.body.innerHTML += (myreport);

		}
		
	},
	
	getJSFromPackage: function(pkg) {
	    var path = pkg.replace(/\./g, "/") + ".js";

		for (var i = 0; i < JSAN.includePath.length; i++) {
			var js;
			try{
				var url = JSAN.includePath[i] + "/" + path;
				var js  = IO.Simple.slurp(url);
			} catch (e) {
				if (i == JSAN.includePath.length - 1) throw e;
			}
			if (js != null) {
			return js;
			}
		}

		return false;
	
	},
	
	reportJSLINT: function(appname, errors){

		var j = errors.length;
		var fatal = false;
		
		if( j !== 0 && errors[j-1] == null ) {
			fatal = true;
		}

		var fatalMessage = fatal ? '<span class="FatalMessage">FATAL</span>' : '';
		var loadedMessage = '<span class="LoadedMessage">' + appname + ' loaded...</span>';

		var output = '<div class="ErrorReport" id=' + appname + '>';
		output += Widget.SimpleTree.generate('./assets/', 'pb' + appname, 'errors' + appname);
		output += loadedMessage + 'found: ' + j + ' errors' + fatalMessage;

		output += '<div id="errors' + appname + '">';
		
		for( var i = 0; i < j; i++ ) {
			var myerror = errors[i];
			if( myerror ) {
				if( myerror.line ) {
					output += ('<div class="error">Error:' + myerror.line + '</div>');
				}	
			}
		}

		output += '</div></div>';
		
		return output;

	}	
	
});
