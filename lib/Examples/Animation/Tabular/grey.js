JSAN.use('Animation.Tabular');

var run = function(parent) {
	
	
	Animation.Tabular.prototype.animate = function(id, interval) {

		var to = 0;
		if ( typeof interval == "undefined" ) {
			interval = 100;
		}
		
		var to = 0;
		for( var i = -10; i <= 10; i++ ) {

			var c = Math.abs(i) * 25;
			var color = "rgb(" + c + ", " + c + "," + c + ")";
			var myfunc = "var w = window['" + id + "']; w.colorCellGroup(w.getDiagonal(" + i + ", 1), '" + color + "' );";
			setTimeout(myfunc, to);
			to += 100;	

		}

	}
	
	mytable = new Animation.Tabular(5, "25", "35", "#ffffff", "#00ff00", "#ffff00", "mytable");
	mytable.create(parent);
	mytable.animate('mytable', 100);
	
	
};
