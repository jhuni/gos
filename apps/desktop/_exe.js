
(function() {

JSAN.use('desktop.view.std.controller');
var viewc = desktop.view.std.controller;

GOLDOS.Executable.assign('desktop.exe', {

	func: function(pid, container, profile) {
		var v = new viewc( pid, profile.geometry );
		v.display(container);

		window[pid] = new desktop.controller.main( v );
		window[pid].init();
	}

});

})();

