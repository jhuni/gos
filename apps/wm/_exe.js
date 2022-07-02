(function() {

var viewc;
var hasCanvas = Conditionals.Platform.hasCanvas;

if( true ) {
	JSAN.use('wm.view.canvas.controller');
	viewc = wm.view.canvas.controller;
} else {
	JSAN.use('wm.view.std.controller');
	viewc = wm.view.std.controller;
}

GOLDOS.Executable.assign('wm.exe', {

	func: function(pid, container, profile) {
		var v = new viewc( pid, profile.geometry );
		v.display(container);

		window[pid] = new wm.controller.main( v );
		window[pid].init();
	}
	
});

})();



/*

=head1 NAME

=head1 DESCRIPTION

=head1 AUTHOR

Jhuni, <jhuni_x@yahoo.com>

=head1 COPYRIGHT

GNU General Public License - Version 2.0

*/
