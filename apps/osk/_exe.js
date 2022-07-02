(function() {

JSAN.use('osk.view.std.controller');
var viewc = osk.view.std.controller;

GOLDOS.Executable.assign('osk.exe', {

	func: function(pid, container, profile) {
		var v = new viewc( pid, profile.geometry );
		v.display(container);

		window[pid] = new osk.controller.main( v );
		window[pid].init();
	}

});


})();
