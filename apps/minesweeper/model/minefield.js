CKIT.Utils.Base.assign('minesweeper.model.minefield',  {
	
	generate: function(size, minecount) {

		var minefield = new CKIT.BitList(size.area());
		for (var i = 0; i < minecount; i++) {
			minefield.setIndex(i,1);
		}
		return new Grid(minefield.shuffle().toArray(), size);
		
	}
	
});








/*

=pod

=head1 NAME

minesweeper.minefield - generates the minefield.

=head1 SYNOPSIS

	JSAN.use('tbsize');
	var size = new tbsize(10,10);
	var field = minesweeper.field.generate(size, 10);
	var sfield = minesweeper.field.surround(field, size);

=head1 DESCRIPTION

This is a module in which outputs the data for minesweeper games whenever a new game occurs.
This can be used with/without a full minesweeper implementation. Only requires a size module.

=head1 FUNCTIONS

=head2 generate(size, mines)

This takes two parameters size and the amount of mines and it creates a random multi-dimensional
array based on the inputed data. The multidimensional array is all ones and zeros such as

	[0,1,0,1,1],
	[1,1,0,0,0],
	[1,0,0,1,1],
	[0,0,0,1,0],
	[0,1,0,0,1]

=head2 surround(field, size)

This just gives you a multi-dimensional array of integers which is the amount of mines around each
square the size is equal to the size of the field input. Values range from 0 to 8.

=head1 AUTHOR

Jhuni <jhuni_x@yahoo.com>

=head1 COPYRIGHT

GNU General Public License.

=cut
 
*/
