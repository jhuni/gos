JSAN.use('CKIT');

CKIT.Utils.Base.assign('CSS.Loader', {
	
	VERSION: '1.0',
	repo:    '.',
	loaded:  {},
	
	link: function(pkg) {
		if( typeof this.loaded[pkg] == 'undefined' || !this.loaded[pkg] ) {
			var path = pkg.replace(/\./g, '/');
			path = "/" + path + ".css";

			this.loaded[pkg] = true;
			document.writeln('<link rel="stylesheet" media="screen" href="' + this.repo + path + '" id="' + pkg + '"></link>');
		}
		return this;
	},
	
	unlink: function(pkg) {
		var elem = document.getElementById(pkg.toString());
		elem.href = "";
		return this;
	}
	
	
});

/*

=head1 NAME

CSS.Loader - Load CSS files with JavaScript (deprecated)

=head1 SYNOPSIS

	CSS.Loader.link('minesweeper.view.std.style');
	
=head1 DESCRIPTION

- Use YAHOO.util.StyleSheet instead! 

This library was created to load CSS packages in executables in the 
Gold operating system, however, it is clear that this doesn't
effectively do the job it was assigned to do. First of all
you can only load CSS files into the dom tree like this
before the DOM tree has been created, second of all you cannot
put the CSS file within a JavaScript file.

Instead of this library YAHOO.util.StyleSheet will load
any style sheet for you automatically and you can have a CSS
file contained within a JavaScript file. As such this
library is not recommended anymore. It shows the disadvantage
of inserting link tags into the DOM tree. (A sad past-time) 


=head1 MODULE LEVEL METHODS

=head2 link(Str pkg) Returns CSS.Loader

Writes a CSS file to the documents structure based on pkg.

	// Example:
	CSS.Loader.link('minesweeper.view.std.style');
	
	// Alternative:
	document.writeln('<link rel="stylesheet" href="' + CSS.Loader.repo + 'minesweeper/view/std/style.css" />');

=head2 unlink(Str pkg) Returns CSS.Loader

Removes the specified CSS file from the DOM.

=head1 AUTHOR

Jhuni, <jhuni_x@yahoo.com>

=head1 COPYRIGHT

GNU General Public License

*/
