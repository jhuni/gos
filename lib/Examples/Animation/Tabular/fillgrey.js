JSAN.use('Animation.Tabular');


// Custom function:
Animation.Tabular.prototype.colorGrey = function(type) {

	for( var i = -10; i <= 10; i++ ) {
		var c = Math.abs(i) * 25;
		var color = "rgb(" + c + ", " + c + "," + c + ")";
		this.colorCellGroup( this.getDiagonal(i, type), color );
	}

};

var run = function(parent) {

	var at = Animation.Tabular;

	var appendToParent = function(name, colorDirection, clear) {
		
		var mnp = document.createElement('div');
		mnp.style.cssFloat = 'left';
		
		if(clear) {
			mnp.style.clear = 'left';
		}
		
		window[name] = new at(5, "25", "35", "#ffffff", "#00ff00", "#ffff00", name);
		window[name].create(mnp);
		parent.appendChild(mnp);
		
		window[name].colorGrey(colorDirection);
		
	}
	
	
	appendToParent('table1', -1);
	appendToParent('table2', 1);
	appendToParent('table3', 1, true);
	appendToParent('table4', -1);
	
};
