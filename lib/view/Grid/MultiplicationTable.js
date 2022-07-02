
if( typeof Grid == 'undefined' ) {
	Grid = {};	
}



Grid.MultiplicationTable = function(width, height, hlcolor, cond) {

	if( typeof hlcolor == "undefined" ) {
		hlcolor = "blue";
	}
	
	if( typeof cond == "undefined" ) {
		cond = function(){ return false; }
	}

	this.width = width;
	this.height = height;
	this.hlcolor = hlcolor;
	this.cond = cond;

}



Grid.MultiplicationTable.prototype = {
	
	getArray: function() {

		var rval = new Array();
		
		for( var row = 1; row <= this.height; row++ ) {

			for( var col = 1; col <= this.width; col++ ) {
				rval.push( row * col );
			}		
			
		}
		
		return rval;

	},

	create: function( parent ) {

		if( typeof parent == "undefined" ) {
			parent = document.body;
		}

		parent.innerHTML += this.getSource();
		
	},

	toString: function() {

		var table = this.getArray();
		var rval = "";
		
		for( var i = 0; i < table.length; i++ ) {
		
			rval += (table[i]).toString() + " ";
			
			if( (i + 1) % this.height == 0 ){
				rval += "\n";
			}
			
		}	
		
		return rval;
		
	},

	getSource: function() {

		var table = this.getArray();
		var rval = "";

		rval += '<table border="1px">' + "\n<tr>\n";
		for( var i = 0; i < table.length; i++ ) {

			var value = table[i];

			if( this.cond(value) == true ) {
				rval += "<td style='background-color: " + this.hlcolor + "'>" + value.toString() + "</td>\n";
			} else {
				rval += "<td>" + value.toString() + "</td>\n";
			}
			
			if( ( i + 1 ) % this.width == 0 ) {
				rval += "</tr>\n<tr>\n";
			}	
		
		}	
		
		rval += "</table>";
		return rval;

	},

	escapeTags: function(str) {

		str = str.replace(/ /g, "&nbsp;");
		str = str.replace(/>/g, "&gt;");
		str = str.replace(/</g, "&lt;");
		str = str.replace(/\n/g, "<br />");

		return str;

	}


}; // End Prototype




/*

=head1 NAME

Grid.MultiplicationTable - A full set of methods for creating multiplication tables.

=head1 VERSION

Version 0.01

=head1 SYNOPSIS

    var mytable = new MultiplicationTable( 12, 12 );
    mytable.create();

    // Require('Conditionals')
    var c = new Conditionals();    
    var cond = isMod(7);

    // This highlights "red" every multiple of seven.
    var mt = new MultiplicationTable( 12, 12, "red", cond );
    mt.create();

=head1 DESCRIPTION

This is a widget which can essentially be used for advanced effects that are related
to multiplication tables including the use of highlighting patterns in numbers that
can be a useful form of visualization.

=head1 ATTRIBUTES

=head2 width

This is a required attribute, it is the quantity of columns to be placed on the multiplication table.

=head2 height

This is another required attribute that denotes the quantity of rows.

=head2 hlcolor

This is a optional attribute that will be used with a condition to highlight squares on the table.

=head2 cond

This is a single function that has one parameter, (val) in which is a number, this function should
return either true or false based on that val. The true or false value indicates rather or not you
should be able to use that value in order to highlight a given cell in the table.

=head1 METHODS

=head2 getArray()

This function returns an array that essentially contains the multplication tables values in and
ordered manner, you can use dimensionize or this.height to make it into a multidimensional
array in which will be useful for manipulation.

=head2 toString()

This function essentially converts the contents of the array associatied with this table
into text which can be displayed in HTML with escape tags.

=head2 getSource()

This function essentially allows you to get raw HTML code that is used in order to display
this, you can also display the HTML code in HTML with escapeTags if you wish.

=head2 escapeTags(str)

This function is useful for displaying either toString() or getSource() in HTML source
in which can be viewed in a browser, otherwise they are only visible in source code.

=head2 create(parent)

This function just takes a parent (defaults to document) and uses writeln to create
the multiplication table into the desired region.

=head1 AUTHORS

Made by Jhuni.<jhuni_x@yahoo.com>

=head1 COPYRIGHT

GNU General Public License

=cut

*/
