// This stores the settings as to where the images are and rather to animate or not.

CKIT.Class.assign('colorlines.model.ImageSettings', {
	
	Has: ['settings', 'interval'],
	
	// Gets a random image from the settings array.
	getRandomImage: function() {
		
		return Math.floor( Math.random() * this.settings.length);
		
	},

	// Get a randomized dir from the settings array
	getRnd: function() {
		// Lang.Random??
		return Lang.Random.choice(this.settings);
	},

	// Takes a ball and uses the settings to change the images.
	rotateBall: function( elem ) {

		var src = elem.src;
		var paths = src.split("/");
		paths.pop();
		
		var rotations = new Array("rot1.png", "rot2.png", "rot3.png", "rot4.png");
		
		var new_rot = parseInt(elem.getAttribute("rot")) + 1;
		if( new_rot == 4 ) { 
			new_rot = 0; 
		}		
		var ns = paths.join("/") + "/" + rotations[new_rot];

		elem.setAttribute("rot", new_rot.toString() );
		elem.src = ns;

	}
	
	
});
