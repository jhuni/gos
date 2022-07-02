
(function() {

JSAN.use('filemgr.view.std.controller');
var viewc = filemgr.view.std.controller;

GOLDOS.Executable.assign('filemgr.exe', {

	func: function(pid, container, profile) {
		if( typeof profile.url == 'undefined' ) {
			profile.url = "/";	
		}
		
		var v = new viewc( pid );
		v.display(container);

		window[pid] = new filemgr.controller.main( v, profile.url );
		window[pid].init();
	}

});

})();

