(function() {

JSAN.use('sudoko.view.std.controller');
var viewc = sudoko.view.std.controller;

GOLDOS.Executable.assign('sudoko.exe', {
	
	// This initializes the application
	func: function(pid,container,profile) {

		var v = new sudoko.view.std.controller(pid, profile.geometry);
		v.display(container);
		
		window[pid] = new sudoko.controller.main( v );
		window[pid].init();
	}
	
});

})();






/*

=head1 NAME

sudoko.exe - a sudoko interface and engine application

=head1 DESCRIPTION

sudoko.exe runs the sudoko application for the Gold Operating
system, it uses the standard MVC architecture and it seperates
the engine into sudoko.model.solver, and the controller
is sudoko.controller.main.

=head1 AUTHOR

Jhuni, <jhuni_x@yahoo.com>

=head1 COPYRIGHT

GNU General Public License v2.0

*/
