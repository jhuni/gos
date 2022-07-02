(function() {

if( !Conditionals.Platform.hasCanvas ) {
	if( Conditionals.Platform.hasSilverlight ) {
		JSAN.use('Canvas.Silverlight');
	} else {
		JSAN.use('Canvas.VML');
	}
}

JSAN.use('gnect.view.std.controller');
var viewc = gnect.view.std.controller;

GOLDOS.Executable.assign('gnect.exe', {

	func: function(pid, container, profile) {
		var v = new viewc( pid, new tbsize(7,6), profile.geometry );
		v.display(container);

		window[pid] = new gnect.controller.main( v );
		window[pid].init();
	}

});



})();

