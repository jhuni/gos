
CKIT.Class.assign('colorlines.controller.main', {
	
	Has: ['view', 'is', 'balls_per_move', 'connection_amount'],
	
	Onload: function() {
		this.appname = 'colorlines';
		this.name = this.view.name;
		this.size = this.view.size;
		
		this.selection = 0;
		this.colors = new Grid( CKIT.Iter.repeat(-1,this.size.area()).toArray(), this.size);
	},

	// Init function for the controller:	
	init: function() {

		this.createColors();

		var myobj = this;
		this.get('table').onmousedown = function(event) {
			myobj.onMouseDown(event);	
		}
		
	},

	menuClick: function(path) {
		
		switch( path ) {
			case 'File/New':
				alert("We are still working on this particular feature.");
				break;
			case 'Help/About':
				alert("Colorlines game made for the GoldOS project.");
				break;
		}
		
	},

	resize: function(newGeometry) {
		
	},

	// Returns the container element.
	getBallContainer: function( elem ) {

		return (elem.tagName == "IMG") ? elem.parentNode : elem;
		
	},

	// Occurs if you move a selected ball.
	move_selected_ball: function(destination) {
		
		// The index values:
		var dest_index = this.getCellIndex(destination) - 1;
		var sel_index = this.getCellIndex(this.selection) - 1;
		 
		// Move the piece:
		document.getElementById(destination).innerHTML = document.getElementById(this.selection).innerHTML;
		document.getElementById(this.selection).innerHTML = "";
		this.selection = 0;

		var dir = this.colors.v[sel_index];
		
		// Create new colors after the move:
		this.move_color(dir, sel_index, dest_index);

		var mycd = coord.fromIndex(dest_index, this.size);
		var con = new Grid.Connections(this.colors.toMultiArray(),mycd, dir);
		var connections = con.checkAllDirections(this.connection_amount);
		
		if( connections.length >= (this.connection_amount) ) {
			this.clear_array(connections);
		} else {
			this.createColors();	
		}
		
	},

	clear_array: function( myarray ) {

		var j = myarray.length;	
		for( i = 0; i < j; i++ ) {
			var myin = (myarray[i].toIndex(this.size.width))
			var elem = this.get("cell" + (myin + 1).toString() );	
			elem.innerHTML = "";
			this.clear_color(myin);
		}
		
	},

	getCellIndex: function(id) {
		
		id = id.replace(this.encap("cell"), "");
		return parseInt(id);
		
	},


	/* Create Colors */

	// The amount of colors to create this is based on balls_per_move.
	createColors: function() {
		
		var ocells = this.getOpenIndexes();
		if( this.balls_per_move > ocells.length ) {
			alert("You have lost");
		}

		// Lang.Random??		
		var indexes = Lang.Random.getRandomIndexes(ocells.length, this.balls_per_move);
		
		for( i = 0; i < this.balls_per_move; i++ ) {
			var cell = ocells[indexes[i]];
			
			var dir = this.is.getRandomImage();
			this.colors.v[cell] = dir;
			this.get("cell" + (cell+1) ).innerHTML = this.createImage( this.is.settings[dir], '1');
		}

	},

	// Returns an array of the open cell-indexes.
	getOpenIndexes: function() {

		var rval = [];
		
		for( var i = 0, l = this.size.area(); i < l; i++ ) {
			if( this.colors.v[i] === -1 ) {
				rval[rval.length] = i;
			}
		}
		
		return rval;
		
	},

	// Returns the string of an image tag.
	createImage: function(dir, rot) {

		return '<img rot="' + rot + '" src="' + dir + 'rot' + rot + '.png" width="45%" alt="Color Lines Ball"></img>';

	},

	// Important is that it takes -1 instead of 0 which is actually going to be one.
	clear_color: function( index ) {
		this.colors.v[index] = -1;
	},

	// Moves a color in the colors array.
	move_color: function( current_dir, start, end ) {
		
		this.clear_color( start );
		this.colors.v[end] = current_dir;
		
	},






	// A timeout function which animates itself.
	animateBall: function( elem, myint ) {
		
		if( this.selection != 0 ) {
			this.is.rotateBall( elem );
			
			var obj = this;
			setTimeout(function(){
				obj.animateBall(elem,myint)
			}, myint);		
			
		}

	},



	/* Events */

	// Occurs on table cells.
	onMouseDown: function( e ) {

		if( e.target.getAttribute("class") == "colorlines" ) {
			return 0;	
		}

		var container = this.getBallContainer(e.target);
		var cd = container.getAttribute("id");
		
		var has_image = container.getElementsByTagName("img").length;
		
		if( has_image > 0 ) {
			if( this.selection == 0 ) {
				this.selection = cd;
				var elem = document.getElementById( cd ).getElementsByTagName("img")[0];
				this.animateBall( elem, 150 );
			}
		} else {
			if( this.selection == 0 ) {
				return 0;
			} else {
				this.move_selected_ball(cd);
			}
		}

	},


	/** BAD */
	/*  COMMON FUNCTIONS */

	get: function() {
		return(  document.getElementById(this.encap(arguments[0]))  ); 	
	},

	encap: function() {
		return(   this.name + arguments[0]  );
	},

	decap: function(value) {
		return( value.substr(this.name.length) );
	}



});





CKIT.Utils.Base.assign('colorlines.controller.main.menu', [

	{text:'File',children: [
		{text: 'New'}	
	]},
	
	{text:'Help', children: [
		{text: 'About'}
	]}
	
]);
