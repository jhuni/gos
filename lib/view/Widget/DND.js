JSAN.use('CKIT');
JSAN.use('coord');
JSAN.use('Dom.CoordUtils');

CKIT.Utils.Base.assign('Widget.DND', {
	
	drag: function(dragElem, e) {
		
		var dragElemCoord = coord.getStylePosition(dragElem),
		
		    startMouseCoord = coord.getFromPageEvent(e).inverse(),
		
		    stop,
		
		// This executes onmousemove. We add the current mouse coord to the inversed or negative version
		// of the starting mouse coordinate.
		drag = function(e) {
			var currentMouseCoord = coord.getFromPageEvent(e);
			
			// If (not stop) set the element position, otherwise do nothing!
			if( !stop ) {
				 coord.sum(dragElemCoord, currentMouseCoord, startMouseCoord).setElementPosition(dragElem);
			}
			
		};
		
		/* END: Variable Declarations */

		document.onmousemove = drag; 
		document.onmouseup = function(){ 
			stop=1; 
			document.onmousemove=''; 
			document.onmouseup=''; 
		};

		
	}
	
});

/*

=head1 METHODS

=head1 drag(dragElem, event)

The first argument is the drag element and then the event is the standard event object. This function
makes the particular object draggable by the mouse whenever it is clicked on.

=head1 AUTHOR

Jhuni, <jhuni_x@yahoo.com>

=head1 COPYRIGHT

GNU General Public License

*/
