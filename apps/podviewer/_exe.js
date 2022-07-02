(function() {

JSAN.use('podviewer.view.std.controller');
var viewc = podviewer.view.std.controller;

GOLDOS.Executable.assign('podviewer.exe', {
	
	func: function(pid, container, profile) {
		profile.name = pid;
		profile.pod = IO.Simple.slurp("./home/jhuni/Programming/JSAN/doc/pod/JSAN.pod");
		var v = podviewer.view.std.controller.create(profile);
		v.display(container);

		window[pid] = new podviewer.controller.main( v );
		window[pid].init();
	}
	
});


})();
