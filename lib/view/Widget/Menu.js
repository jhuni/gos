if( typeof(Widget) == 'undefined' ) { 
	Widget = {}; 
}

Widget.Menu = {

	show : function(identifier1, identifier2) {
		var elem = document.getElementById(identifier1);
		var elem2 = document.getElementById(identifier2);

		elem.style.backgroundColor = '0088ff';
		elem.style.color = 'white';
	
		elem2.style.display = 'block';
		elem2.style.position = 'absolute';
		elem2.style.top = (elem.offsetHeight + elem.offsetTop - 1).toString() + "px";
		elem2.style.left = (elem.offsetLeft).toString() +  "px";
		elem2.style.zIndex = "100";
		elem2.style.backgroundColor = '#ffffff';
	},
	
	close : function(identifier1, identifier2) {
		var elem = document.getElementById(identifier1);
		var elem2 = document.getElementById(identifier2);

		elem.style.backgroundColor = 'white';
		elem.style.color = 'black';
		elem2.style.display = 'none';
	},
	
	click : function( identifier1, identifier2 ) {

		var menuItems = document.getElementById(identifier2);
		var display = menuItems.style.display;
		
		var vis = true;
		if( display != 'block' ) {
			vis = false;
		}

		if( vis == true ) {
			this.close(identifier1, identifier2);
		} else {
			this.show(identifier1, identifier2);
		}

	}

};
