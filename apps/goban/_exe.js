(function() {
	
if( !Conditionals.Platform.hasCanvas ) {
	if( Conditionals.Platform.hasSilverlight ) {
		JSAN.use('Canvas.Silverlight');
	} else {
		JSAN.use('Canvas.VML');
	}
}

JSAN.use('goban.view.std.controller');
var viewc = goban.view.std.controller;
	
GOLDOS.Executable.assign('goban.exe', {
	
	func: function( pid, container, profile ) {
		var geometry = new Shape.Rect( new coord(0,0), profile.geometry.size );
		var v = new viewc( pid, new tbsize(5,5), geometry );
		v.display(container);

		window[pid] = new goban.controller.main( v );
		window[pid].init();
	}
	
});

})();


