(function() {

var viewc;

if( Conditionals.Platform.hasCanvas ) {
	JSAN.use('checkers.view.canvas.controller');
	viewc = checkers.view.canvas.controller;
} else {
	JSAN.use('checkers.view.std.controller');
	viewc = checkers.view.std.controller;
}

GOLDOS.Executable.assign('checkers.exe', {
	
	func: function(mypid, container, profile) { 
		
		var v = new viewc(mypid, new tbsize(8,8), profile.geometry);
		v.display(container);
		
		window[mypid] = new checkers.controller.main(v);
		window[mypid].init();
	}
	
	
});


})();


/* 

=head1 NAME

checkers.exe - an AJAX-based checkers executable.

=head1 DESCRIPTION

Checkers is a game played all around the world by two players. Checkers has been solved and it has been found to be a draw at perfect play. This program can play you at checkers but it certainly will never do nearly that good. In order to win you capture all your opponents pieces or trap them so that he cannot move. Every piece is vital!

This is part of the Gold Operating System.

=head1 AUTHOR

Jhuni <jhuni_x@yahoo.com>

=head1 COPYRIGHT

GNU General Public License

*/
