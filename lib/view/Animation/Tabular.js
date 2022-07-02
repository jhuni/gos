
if( typeof Animation == 'undefined' ) {
	Animation = {};
}


Animation.Tabular = function(size, bw, bh, bgcolor, hlcolor, midcolor, id) {

	this.size = size;
	this.bw = bw;
	this.bh = bh;
	this.bgcolor = bgcolor;
	this.hlcolor = hlcolor;
	this.midcolor = midcolor;
	this.id = id;

};



Animation.Tabular.prototype = {
		
	getCell: function(no) {
		var table = document.getElementById(this.id);
		var elements = table.getElementsByTagName("td");
		return elements[no - 1];
	},

	setCellColor: function(no, color) {
		this.getCell(no).style.backgroundColor = color;
	},

	create: function(parent) {
		
		var tableHTML = '';
		
		size = (this.size * 2) + 1
		tableHTML += ("<table border='0' id='" + this.id + "'>");
		var current_index = 1;
		
		for (var ht = 1; ht <= size; ht++) {
		
			tableHTML += ("<tr>");
			
			for (var wt = 1; wt <= size; wt++) {
			
				// Variables for computation:
				var front = "<td style='background-color: ";
				var back = "; width: " + this.bw + "px; height: " + this.bh + "px;'></td>";

				tableHTML += (front + this.bgcolor + back);
				current_index++;
				
			}

			tableHTML += ("</tr>");
		
		}
		
		tableHTML += ("</table>");
		
		// Now finally append the HTML to the parents HTML:
		parent.innerHTML += tableHTML;

		
	},

	setRadius: function(min, max) {

		var size = (this.size * 2) + 1;
		var center = Math.floor(size / 2) + 1;
		
		for (var ht = 1; ht <= size; ht++) {
		
			for (var wt = 1; wt <= size; wt++) {
			
				// Variables for computation:
				var dist = Math.abs(center - wt) + Math.abs(center - ht);
				var mycol = "";

				if ( dist >= min && dist <= max ) {
					mycol = this.hlcolor;
				} else if( dist <= min ) {
					mycol = this.midcolor;		
				} else {
					mycol = this.bgcolor;
				}
				
				var coord = ( (ht - 1) * size) + wt;
				this.setCellColor(coord.toString(), mycol);
				
			}
		
		}


	},

	setSquare: function(min, max) {

		var size = (this.size * 2) + 1;
		var center = Math.floor(size / 2) + 1;
		
		for (var ht = 1; ht <= size; ht++) {
		
			for (var wt = 1; wt <= size; wt++) {
			
				// Variables for computation:
				var dist = Math.abs(center - wt)
				var mycol = "";
		
				if(Math.abs(center - ht) > Math.abs(center - wt)){
					dist = Math.abs(center - ht);
				}
				
				var mycol = "";

				if ( dist >= min && dist <= max ) {
					mycol = this.hlcolor;
				} else if( dist <= min ) {
					mycol = this.midcolor;		
				} else {
					mycol = this.bgcolor;
				}
				
				var coord = ( (ht - 1) * size) + wt;
				this.setCellColor(coord.toString(), mycol);
				
			}
		
		}

	},

	getRow: function(row) {

		var asize = (this.size * 2) + 1;
		var curpos = ( (row - 1) * asize) + 1;
		var rval = new Array();
		
		for( i = 0; i < asize; i++ ) {
			var elem = this.getCell(curpos + i);
			rval.push( elem );
		}
		
		return rval;

	},

	getColumn: function(col) {

		var asize = (this.size * 2) + 1;
		var curpos = col;
		var rval = new Array();
		
		for(i = 0; i <= (asize * (asize - 1) + col); i += asize) {
			rval.push( this.getCell(i + col) );
		}
		
		return rval;

	},

	getDiagonal: function(val, dtype) {

		var asize = (this.size * 2) + 1;
		var rval = new Array();
		
		var type = true;
		if( dtype.toString() == "-1" ) {
			type = false;
		}
		
		// Setup conditions to either go forward or backwards:
		var inc = type ? 1 : -1;
		var start = type ? 0: (size -1);
		var cond;
		if( type == true ) {
			cond = function(i){ if(i < size){return true;} }
		} else {
			cond = function(i){ if(i >= 0){ return true; } }
		}
		
		var func;
		if( type == true ) {
			func = function(size, i) { return (i + 1);  }
		} else {
			func = function(size, i) { return (size - i); }
		}
		
		for( var i = start; cond(i); i += inc ) {
			
			var index = func(size, i);
			var rank = this.getRow(index);		
			var elem = rank[i + val];
			
			if( typeof elem != "undefined" ) {
				rval.push(elem);
			}
		
		}
		
		return rval;

	},

	colorCellGroup: function(group, color) {
		
		for( var i in group ) {
			group[i].style.backgroundColor = color;
		}

	},

	// Animation:

	animateRadius: function(id, to, interval, direction) {

		// Absolute size:
		var asize = (this.size * 2) + 1;
		
		// Determine whether or not to go through a forwards loop or a backwards loop.
		if( direction == "forwards" || typeof direction == "undefined" || direction == 1 ) {
			direction = true;
		} else {
			direction = false;
		}
		
		var init = direction ? 0: asize;
		var cond;
		
		if( direction == true) {
			cond = function(){ if( i <= asize ) { return true; } }
		} else {
			cond = function(){ if( i >= 0 ) { return true; } }
		}
		
		var inc = direction ? 1: -1;
		
		// Finally do the loop:
		for (var i = init; cond(i); i += inc) {

			var myset = new Function("window['" + id + "'].setRadius(0, " + i + ");");
			setTimeout(myset, to);
			to += interval;
			
			for(var subi = 0; subi <= i; subi++){
			
				if(subi < 10){
					var newcolor = "#" + subi.toString() + subi.toString() + 'ff00';
					setTimeout(function(){ this.hlcolor = newcolor }, to);
				}
				
				var myf = new Function("window['" + id + "'].setRadius(" + subi + ", " + i + ");");
				setTimeout(myf, to);
				to += interval;
				
			}
			
		}
		
		return to;

	},

	animateSquare: function(id, to, interval, direction) {

		var asize = (this.size * 2) + 1;
		
		if( direction == 1 || direction == "forwards" || typeof direction == "undefined" ) {
			for (var i = 0; i <= (asize - 1); i++) {
				setTimeout("window['" + id + "'].setSquare(0, " + i + ");", to);
				to += interval;
			}
		} else {
			for (var i = (asize - 1); i >= 0; i--) {
				setTimeout("window['" + id + "'].setSquare(0, " + i + ");", to);
				to += interval;
			}
		}
		
		return to;

	}



}; // End Prototype




/*

=pod

=head1 NAME

Animation.Tabular - A class in which is used for HTML table graphics and animations.

=head1 VERSION

Version 0.01

=head1 SYNOPSIS

    var mytable = new Animation.Tabular(5, "25", "35", "#ffffff", "#00ff00", "#ffff00", "mytable");
    mytable.create();
    mytable.animateRadius('mytable', 0, 100, 1);

=head1 DESCRIPTION

This is a class which essentially provides several general purpose functions that will
be very useful for the purpose of animating a table. This can be a very useful
form of visualization and it performs quite well.

=head1 DEPENDENCIES

None.

=head1 ATTRIBUTES

=head2 size

This is the amount of rows and columns that will be output in the new table, the value will be multiplied
by two and added to one for absolute size ((size * 2) + 1).

=head2 bw

This is the width size of the table cells to be output in HTML.

=head2 bh

This is the height size of the table cells to be output in HTML.

=head2 bgcolor

This is essentially just the backgroundcolor to be used in the animation and other effects to be implemented
in the table graphics.

=head2 hlcolor

This is the highlight color to be used in animation and effects.

=head2 midcolor

This is the middle color, this color will be seen in between the radius and in between the squares in the
setRadius and setSquare methods.

=head2 id

This is the identifier of the table to be highlighted. This is essentially for the getCell method in which
is a method for getting all of the cells in the table, setCellColor and all other methods call getCell.

=head1 METHODS

=head2 getCell(no)

This function is called whenever you want to reference a cell within the table element. This function
merely uses getElementsByTagName("td") from the table element and then references the index that is
the value no. This function then returns the corresponding td element.

=head2 setCellColor(no, color)

This function is an intermediate to getCell, this function calls getCell based on no and then it
uses style.backgroundColor to set the cells color according to the parameters.

=head2 create

This function is essential for initalizing the table, this function will essentially create the
table and then it will place all the cells in the respective order according to the size attribute.

=head2 setRadius(min, max)

This function is useful for highlighting the cells in a radius fashion, the end result is a graphic
in which is displayed without a side of more then one length.

=head2 setSquare(min, max)

This creates a square graphic in the table from 0 to min is midcolor and from min to max is the
hlcolor. This then uses setCellColor to immediately animate the table.

=head2 getRow(row)

This function returns a row of td elements from the table.

=head2 getColumn(col)

This function returns a column of td elements from the table.

=head2 getDiagonal(val, dtype)

This function returns a diagonal based on dtype, dtype is either true or false. If dtype is true
then it will take a positive slope, otherwise a negative slope is taken, an array of td elements
are returned from this function.

=head2 colorCellGroup(group, color)

This function takes an array of td elements and colors them all in. Useful in conjunction with getRow,
getColumn, and getDiagonal, for example: colorCellGroup(getRow(1), "red").

=head2 animateRadius(id, to, interval, direction)

This function starts at to in terms of time and from there it goes by interval and does the required animation
in accordance with direction. This function requires that the object be in the window namespace and
that objects placement in the window namespace is correspondent to id. This function returns the amount
of time it takes to accomplish the task. If you need to do this multiple times then use the return
value and then add that value to to.

=head2 animateSquare(id, to, interval, direction)

This function is similar to animateRadius it starts at to time index, using window['id'] it animates
in accordance with the direction and increments with interval and then returns the time taken
for the function to work effectively.

=head1 AUTHORS

Jhuni, <jhuni_x@yahoo.com>

=head1 COPYRIGHT

Public Domain

=cut


*/
