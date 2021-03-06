CKIT.Utils.Base.assign('gnometris.model.shapes', new CKIT.List([


		// 0
		new Grid([
			1,1,1,1,
			0,0,0,0,
			0,0,0,0,
			0,0,0,0
		], new tbsize(4,4) ),

		// 1
		new Grid([
			1,0,0,
			1,1,1,
			0,0,0
		], new tbsize(3,3) ),

		// 2
		new Grid([
			0,0,1,
			1,1,1,
			0,0,0
		], new tbsize(3,3) ),

		// 3
		new Grid([
			1,1,
			1,1
		], new tbsize(2,2) ),

		// 4
		new Grid([
			0,1,1,
			1,1,0,
			0,0,0
		], new tbsize(3,3) ),

		// 5
		new Grid([
			0,1,0,
			1,1,1,
			0,0,0
		], new tbsize(3,3) ),

		// 6
		new Grid([
			1,1,0,
			0,1,1,
			0,0,0
		], new tbsize(3,3) )


])  ); // End object declaration










/*

=pod

=head1 NAME

gnometris.shapes - configures the default tetrimonos and how to rotate them.

=head1 SYNOPSIS

	JSAN.use('gnometris.shapes');
	var coords = gnometris.shapes.getRandom();
	var rotatedCoords = gnometris.shapes.rotate(coords);

=head1 PROPERTIES

=head2 gnometris.shapes[]

This is an array of objects that all have a className that can be associated with
a CSS or JSON stylesheet. They also have the coords which is what the user shall see. 
The coords are all ordered in such a manner that they are a square of booleans.

	[0,1,0],
	[1,1,1],
	[0,0,0]

This is the shape used for the common tetromino known as T (it is an
upside-down t). This is stored in gnometris.shapes[5]. 

=head2 Changing the shapes

You can change the shape of the tetrominos in this file by changing the arrays and this
will affect the gnometris application. You can add more shapes to the
array without breaking the game but you won't have a style unless you use
one of the other classNames or add another one to a view.

=head1 AUTHOR

Jhuni <jhuni_x@yahoo.com>

=head1 COPYRIGHT

GNU General Public License.

=cut

*/



