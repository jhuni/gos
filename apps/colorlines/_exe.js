(function() {

var cwd = JSAN.cwd.toString();

GOLDOS.Executable.assign('colorlines.exe', {
	
	func: function(pid, container, profile) {
		
		profile.cwd = cwd;
	
		var s = profile.geometry.size;
		var boardSize = new tbsize(10,10);
		var blockSize = new tbsize( Math.round(s.width/boardSize.width)-5, Math.round(s.height/boardSize.height)-6 );
	
		var v = new colorlines.view.std.controller(pid, boardSize, blockSize );
		v.display(container);
		
		var dirs = new Array();
		var prefix = profile.cwd + './view/std/' + '/images/balls/';
		dirs[0] = prefix + 'aqua/';
		dirs[1] = prefix + 'blue/';
		dirs[2] = prefix + 'green/';
		dirs[3] = prefix + 'orange/';
		dirs[4] = prefix + 'pink/';
		dirs[5] = prefix + 'red/';
		dirs[6] = prefix + 'yellow/';
		
		var cl = new colorlines.model.ImageSettings( dirs, 0 );
		window[pid] = new colorlines.controller.main(v, cl, 3, 5);
		window[pid].init();
		
	}
	
});

})();








/* 

=head1 NAME

colorlines.exe - this plays colorlines in your web browser.

=head1 DESCRIPTION

Colorlines is a game that was invented by a Russian game company in 1992.
The goal of the game is to get five in a row, however, this game allows
you to set it to a hundred in a row if you so desire. In addition
the normal layout is 9x9, however, you can change it to any value you wish.
This is part of the Gold Operating System.

=head1 AUTHOR

Jhuni <jhuni_x@yahoo.com>

=head1 COPYRIGHT

GNU General Public License

*/
