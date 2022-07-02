(function() {

JSAN.use('minesweeper.view.std.controller');
var viewc = minesweeper.view.std.controller;

var cwd = JSAN.cwd.toString();

GOLDOS.Executable.assign('minesweeper.exe', {
	
	profiles: {
		
		'Small': {
			size: new tbsize(8,8),
			minecount: 10,
			useFlagWarnings: true,
			useFlagQuestion: true	
		},
		
		'Medium': {
			size: new tbsize(16,16),
			minecount: 40,
			useFlagWarnings: true,
			useFlagQuestion: true	
		},
		
		'Large': {
			size: new tbsize(16,30),
			minecount: 100,
			useFlagWarnings: true,
			useFlagQuestion: true	
		},
		
		'Custom': {
			size: new tbsize(20,20),
			minecount: 60,
			useFlagWarnings: true,
			useFlagQuestion: true
		}
		
	},
	
	defaultProfile: 'Medium',
	
	func: function(pid, container, profile) {
		
		profile.name = pid;
		profile.cwd = cwd;
		
		CKIT.Utils.Base.update( profile, minesweeper.exe.profiles[minesweeper.exe.defaultProfile] );
		
		// Create view
		var v = new viewc.create(profile);
		v.display(container);
		
		// Create the controller
		window[pid] = new minesweeper.controller.main( v, profile.minecount, profile.useFlagQuestion, profile.useFlagWarnings, profile.cwd );
		window[pid].init();
	}
	
});


})();



/* 

=head1 NAME

minesweeper.exe - a minesweeper game for your web browser.

=head1 DESCRIPTION

This JavaScript based minesweeper game runs in your web browser.

This is part of the Gold Operating System.

=head1 AUTHOR

Jhuni <jhuni_x@yahoo.com>

=head1 COPYRIGHT

GNU General Public License

*/
