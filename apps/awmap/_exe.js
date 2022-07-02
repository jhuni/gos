
(function() {

JSAN.use('awmap.view.std.controller');
var viewc = awmap.view.std.controller;

GOLDOS.Executable.assign('awmap.exe', {

	func: function(pid, container, profile) {
		var v = new viewc( pid );
		v.display(container);

		window[pid] = new awmap.controller.main( v );
		window[pid].init();
	}

});

})();

