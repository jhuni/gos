(function() {

var viewc;

if( Conditionals.Platform.hasCanvas ) {
	JSAN.use('tictactoe.view.canvas.controller');
	viewc = tictactoe.view.canvas.controller;
} else if( Conditionals.Platform.hasSVG ) {
	JSAN.use('tictactoe.view.raphael.controller');
	viewc = tictactoe.view.raphael.controller;	
} else {
	JSAN.use('tictactoe.view.std.controller');
	viewc = tictactoe.view.std.controller;
}


GOLDOS.Executable.assign('tictactoe.exe', {
	
	func: function(pid, container, profile) {
		
		var v = new viewc( pid, new tbsize(3,3), profile.geometry );
		v.display( container );

		window[pid] = new tictactoe.controller.main( v, 3 );
		window[pid].init();
	}
	
});

})();





/* 

=head1 NAME

tictactoe.exe - a tictactoe game.

=head1 DESCRIPTION

This application plays the game tictactoe.

This is part of the Gold Operating System.

=head1 AUTHOR

Jhuni <jhuni_x@yahoo.com>

=head1 COPYRIGHT

Gnu General Public License

*/
