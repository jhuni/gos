(function() {
	
if( !Conditionals.Platform.hasCanvas ) {
	if( Conditionals.Platform.hasSilverlight ) {
		JSAN.use('Canvas.Silverlight');
	} else {
		JSAN.use('Canvas.VML');
	}
}

JSAN.use('chess.view.canvas.controller');
var viewc = chess.view.canvas.controller;

GOLDOS.Executable.assign("chess.exe", {
	
	func: function(pid, container, myargs) {
		var v = new viewc(pid, new tbsize(8,8), myargs.geometry);
		v.display(container);
	
		window[pid] = new chess.controller.main(v);
		window[pid].init();
	}
	
});


})();
