(function() {

JSAN.use('taskmgr.view.std.controller');
var viewc = taskmgr.view.std.controller;

GOLDOS.Executable.assign('taskmgr.exe', {

	func: function(pid, container, profile) {
		
		var v = new taskmgr.view.std.controller( pid, profile.geometry );
		v.display(container);

		window[pid] = new taskmgr.controller.main( v );
		window[pid].init();
	}

});


})();
