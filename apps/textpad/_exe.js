
(function() {

JSAN.use('textpad.view.std.controller');
var viewc = textpad.view.std.controller;

GOLDOS.Executable.assign('textpad.exe', {

	func: function(pid, container, profile) {
		
		if( typeof profile.text == 'undefined' ) {
			profile.text = '';	
		}
		
		var v = new viewc( pid, profile.geometry );
		v.display(container);

		window[pid] = new textpad.controller.main( v, profile.text );
		window[pid].init();
	}

});

})();

