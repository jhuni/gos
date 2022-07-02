/*jsan __header__ */

JSAN.use('CKIT');

/*jsan __end__ */


(function() {

var fileSystem = {
	
	"/": [
		"/apps",
		"/assets",
		"/doc",
		"/home",
		"/lib",
		"/r&d",
		"ChangeLog",
		"examples.html",
		"index.html",
		"README",
		"treeview-sprite.gif"
	],
	
	"/home/": [
		"/jhuni"
	],
	
	"/home/jhuni/": [
		"/Documents",
		"/Pictures",
		"/Programming"
	],
	
	"/home/jhuni/Documents/": [
		"/User Interfaces",
		"Todo"
	],
	
	"/home/jhuni/Pictures/": [
		"test.svg"
	]
	
};

CKIT.Utils.Base.assign('IO.Simple', {
	
	root: "/",
	
	ls: function(dirname) {

		if( dirname == '' ) {
			dirname = '/';
		}
		
		if( typeof fileSystem[dirname] !== 'undefined' ) {
			return fileSystem[dirname];		
		} else {
			return '';			
		}
		
	},
	
	mkdir: function(dirname) {
	
	},
	
	slurp: function( url ) {
		// This same function seems to be defined in JSAN.
		// Wrap the whole thing around a try so as to detect any errors.
		var requestObject;
		try {
			
			requestObject = typeof ActiveXObject !== "undefined" ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
		
			// Start using the requestObject
			requestObject.open("GET", "./" + url, false);
			
			requestObject.send(null);
			
			if( requestObject.status === 200 || requestObject.status === 0 ) {
				
				var text = requestObject.responseText;
				
				if( typeof text === 'string' ) {
					return text;	
				}
				
			}
			
			
		} catch( e ) {
			return '';
		}
		
		return '';	
	},
	
	
	write: function(fileName, data) {
		
	},
	
	rm: function(fileName) {

		
	},
	
	mv: function(startname, endname) {
	
		
	}

	
});



})();
