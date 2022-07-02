(function() {

JSAN.use('gnometris.view.std.controller');
var viewc = gnometris.view.std.controller;

GOLDOS.Executable.assign('gnometris.exe', {
	
	func: function(pid, container, profile) {
		
		var v = new viewc( pid, new tbsize(10,20), profile.geometry );
		v.display( container );

		window[pid] = new gnometris.controller.main(v, new tbsize(10,20), 250);
		window[pid].init();
	}

} );


})();



/* 

=head1 NAME

gnometris.exe - a tetris game licensed under the GPL.

=head1 DESCRIPTION

This game plays tetris in your web browser, it is highly configurable.

This is part of the Gold Operating System.

=head1 AUTHOR

Jhuni <jhuni_x@yahoo.com>

=head1 COPYRIGHT

GNU General Public License

*/
