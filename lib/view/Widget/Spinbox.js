/*
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JSAN.use('Lang.Utils');
Lang.Utils.makeNamespace('Widget.Spinbox');

var ub = new Image();
var db = new Image();
var ubhover = new Image();
var dbhover = new Image();
var ubactive = new Image();
var dbactive = new Image();

ub.src = "http://img263.imageshack.us/img263/778/upbuttonys7.png";
db.src = "http://img263.imageshack.us/img263/3815/downbuttonyv7.png";
ubhover.src = "http://img145.imageshack.us/img145/8292/upbuttonhoverws9.png";
dbhover.src = "http://img145.imageshack.us/img145/6154/downbuttonhovervm2.png";
ubactive.src = "http://img522.imageshack.us/img522/8853/upbuttonmdownfh5.png";
dbactive.src = "http://img522.imageshack.us/img522/2967/downbuttonmdownqd7.png";


Widget.Spinbox = {

// Constants (capitalized)
VERSION: '1.0',
NAME:    'Widget.Spinbox',
	
processAll: function() {

	var divs = document.getElementsByTagName('div');
	
	for( var i = 0; i < divs.length; i++ ) {

		var div = divs[i];

		if( div.getAttribute("etype") == "nud") {
			this.processElem(div);
		}

	}

},

processElem: function(elem) {

	var id = elem.id;

	// Set defaults:
	var defaults = new Object();
	defaults["increment"] = 1;
	defaults["places"] = 0;
	defaults["val"] = 0;
	defaults["min"] = 0;
	defaults["max"] = 100;	
	defaults["onincrement"] = '';
	defaults["updownalign"] = 'right';

	for( var key in defaults ) {

		if( !elem.getAttribute(key) ) {
			elem.setAttribute(key, defaults[key].toString() );
		}		

	}
	

	var tb = document.createElement('input');
	var ubutton = document.createElement('img');
	var dbutton = document.createElement('img');
	
	ubutton.setAttribute("alt", "Up Button");
	dbutton.setAttribute("alt", "Down Button");
	ubutton.style.display = "block";
	dbutton.style.display = "block";
	
	tb.type = "text";
	tb.value = elem.getAttribute("val"); 
	tb.setAttribute("onchange",  this.NAME + ".validate('" + id + "')");
	tb.setAttribute("onkeydown", this.NAME +  ".onkeydown(event, '" + id + "')");
	tb.setAttribute("onkeyup", this.NAME + ".okeyup('" + id + "')");
	elem.setAttribute("speed", "0");

	ubutton.src = ub.src;
	dbutton.src = db.src;

	// Events:
	ubutton.setAttribute("onmouseover", this.NAME + ".ubmouseover('" + id + "')");
	dbutton.setAttribute("onmouseover", this.NAME + ".dbmouseover('" + id + "')");
	ubutton.setAttribute("onmouseout", this.NAME + ".ubmouseout('" + id + "')");
	dbutton.setAttribute("onmouseout", this.NAME + ".dbmouseout('" + id + "')");
	ubutton.setAttribute("onmousedown", this.NAME + ".ubmousedown('" + id + "')");
	dbutton.setAttribute("onmousedown", this.NAME + ".dbmousedown('" + id + "')");
	ubutton.setAttribute("onmouseup", this.NAME + ".ubmouseup('" + id + "')");
	dbutton.setAttribute("onmouseup", this.NAME + ".dbmouseup('" + id + "')");

	var uda = elem.getAttribute("updownalign");

	var mydiv = document.createElement('div');
	mydiv.style.width = '14px';
	mydiv.style.cssFloat = 'left';
	mydiv.appendChild(ubutton);
	mydiv.appendChild(dbutton);
	
	var tbdiv = document.createElement('div');
	tbdiv.style.cssFloat = 'left';
	tbdiv.appendChild(tb);

	if( uda == "left" ) {
		elem.appendChild(mydiv);
		elem.appendChild(tbdiv);
	} else {
		elem.appendChild(tbdiv);
		elem.appendChild(mydiv);
	}

},




getNudButton: function( identifier, index ) {

	var nud = document.getElementById(identifier);
	var buttons = nud.getElementsByTagName("img");
	return buttons[index];

},

getNudTextbox: function( identifier ) {
	var elem = document.getElementById(identifier);
	var inputs = elem.getElementsByTagName("input");
	return inputs[0];
},

increment: function(identifier, inctype) {

	var incmod = inctype ? 1 : -1;
	var nud = document.getElementById(identifier);
	var tb = this.getNudTextbox(identifier);
	var speed = parseInt( nud.getAttribute("speed") );

	if( speed != 0 ) {

		var oninc = nud.getAttribute("onincrement");
		if( oninc != "" ) {
				eval( oninc );	
		}

		var val = parseFloat(tb.value);
		val += parseFloat(nud.getAttribute("increment")) * incmod;
		tb.value = val.toString();

		setTimeout('Widget.Spinbox.increment("' + identifier + '",' + inctype + ')', speed);

		if ( speed > 25 ) {
			speed /= 2;
			nud.setAttribute("speed", speed.toString());
		}

	}

	this.validate( identifier );

},

validate: function(identifier) {

	var nud = document.getElementById(identifier);
	var elem = this.getNudTextbox(identifier);
	var mynum = parseFloat( elem.value );
	var dplaces = parseInt( nud.getAttribute("dplaces") );

	if ( isNaN(mynum) == true ) {
		mynum = 0;
	}

	mynum = mynum.toFixed( dplaces );

	var minval = parseFloat( nud.getAttribute("min") );
	var maxval = parseFloat( nud.getAttribute("max") );

	if ( mynum < minval ) {
		mynum = minval;
	} 

	if ( mynum > maxval ) {
		mynum = maxval;
	}

	elem.value = mynum;

},

ubmouseover: function( identifier ) {
	this.getNudButton(identifier, 0).src = ubhover.src;
},

dbmouseover: function( identifier ) {
	this.getNudButton(identifier, 1).src = dbhover.src;
},

ubmouseout: function( identifier ) {
	this.getNudButton(identifier, 0).src = ub.src;
},

dbmouseout: function( identifier ) {
	this.getNudButton(identifier, 1).src = db.src;
},

// Mouse down and up functions:

ubmousedown: function( identifier ) {
	this.getNudButton(identifier, 0).src = ubactive.src;
	document.getElementById(identifier).setAttribute("speed", "1000");
	this.increment(identifier, true);
},

dbmousedown: function( identifier ) {;
	this.getNudButton(identifier, 1).src = dbactive.src;
	document.getElementById(identifier).setAttribute("speed", "1000");
	this.increment(identifier, false);
},

ubmouseup: function( identifier ) {
	this.getNudButton(identifier, 0).src = ubhover.src;
	document.getElementById(identifier).setAttribute("speed", "0");
	document.getElementById( identifier ).setAttribute("speed", "0");
},

dbmouseup: function( identifier ) {
	this.getNudButton(identifier, 1).src = dbhover.src;
	document.getElementById(identifier).setAttribute("speed", "0");
	document.getElementById( identifier ).setAttribute("speed", "0");
},

onkeydown: function(e, identifier) {

	var unicode= e.keyCode ? e.keyCode : e.charCode;
	document.getElementById(identifier).setAttribute("speed", "500");	

	if( unicode == "38" ) {
		this.increment(identifier, true);
	} else if( unicode == "40" ) {
		this.increment(identifier, false);
	}

},

onkeyup: function(identifier) {

	document.getElementById(identifier).setAttribute("speed", "0");

}


}; // End Prototype





/*

=head1 NAME

Widget.nud - A simple NumericUpDown widget object.

=head1 VERSION

Version 0.01

=head1 SYNOPSIS

    <div etype="nud" id="mydiv1" increment="1" places="0" val="10" min="0" max="100" onincrement="" updownalign="left"></div>
    <div etype="nud" id="mydiv2" increment="1" places="0" val="10" min="0" max="100" onincrement="" updownalign="left"></div>
    
    <script type="text/javascript">
    <!--
    process_nuds();
    //-->
    </script>

=head1 DESCRIPTION

This is a numericupdown widget that has a similar effect to the widget
you would see in popular operating systems.

=head1 ATTRIBUTES

=head2 id

This attribute is the only one that is required by the system in order for it to operate successfully. This
must also be unique for success.

=head2 increment

This the value to be added or subtracted from the textbox every time it is incremented. Default is 1.

=head2 places

This is essentially the amount of decimal places tht you can have. Default is 0.

=head2 val

This is the value in which is put on the textbox by default. Default is 0.

=head2 min

This is the minimum possible value that can occur. Default is 0.

=head2 max

This is the maximum possible value that can occur. Default is 100.

=head2 onincrement

This is an event to be called by eval during each occurence of nud_increment. Default is blank.

=head2 updownalign

This is the relative position of the buttons to the textbox. Default is 'right'.

=head1 FUNCTIONS

=head2 process_nuds()

This is the primary function. This function will setup all of the elements calls process_nud on
any div element that is a nud widget.

=head2 process_nud(elem)

This function takes any div that is to be a nud and then creates the inner elements and the
properites that are important for the element.

=head2 getNudButton( identifier, index )

This function takes the id of the nud div and then gets the upbutton if you specified 0
as index or the down button if you specified 1.

=head2 getNudTextbox( identifier )

This function gets the textbox from the nud div's id.

=head2 nud_increment( identifier, inctype )

This is the function that is called at any time that the widget is to be incremented.

=head2 nud_validate( identifier, inctype )

This function is called at an increment or any change in order to make sure
a valid value is placed in the widget.

=head1 EVENTS

=head2 ubmouseover( identifier )

=head2 dbmouseover( identifier)

=head2 ubmouseout( identifier )

=head2 dbmouseout( identifier )

=head2 ubmousedown( identifier )

=head2 dbmousedown( identifier )

=head2 ubmouseup( identifier )

=head2 dbmouseup( identifier )

=head2 nud_onkeydown( e, identifier )

=head2 nud_onkeyup( identifier )

=head1 AUTHORS

Made by Jhuni.<jhuni_x@yahoo.com>

=head1 COPYRIGHT

GNU General Public License

=cut

*/
