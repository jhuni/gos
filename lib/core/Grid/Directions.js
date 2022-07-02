JSAN.use('Grid.CoordMap');

CKIT.Utils.Base.assign('Grid.Directions', {
	
	n   :  new coord( 0, -1 ),
	s   :  new coord( 0,  1 ),
	e   :  new coord( 1,  0 ),
	w   :  new coord(-1,  0 ),
	nw  :  new coord(-1, -1 ),
	se  :  new coord( 1,  1 ),
	ne  :  new coord( 1, -1 ),
	sw  :  new coord(-1,  1 ),
	
	neighbourMap: new Grid.CoordMap( [new coord( 0, -1 ),new coord( 0,  1 ),new coord( 1,  0 ),new coord(-1,  0 ),
	new coord(-1, -1 ),new coord( 1,  1 ),new coord( 1, -1 ),new coord(-1,  1 ) ])
	
});





/*

=head1 NAME

Grid.Directions - deal with all kinds of directions

=head1 DESCRIPTION

This is an object that store directions which are essentially coordinates
that are looped through from a startpoint.

=head1 AUTHOR

Jhuni <jhuni_x@yahoo.com>

=head1 COPYRIGHT

GNU General Public License

=cut

*/
