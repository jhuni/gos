if( typeof Widget == "undefined" ) {
	Widget = {};
};

Widget.SimpleTree = {
	
	toggleVisibility: function(identifier) {

		var elem = document.getElementById(identifier);
		var vis = elem.style.visibility;

		if(vis == "visible"){
			elem.style.visibility = "hidden";
			elem.style.display = "none";
		} else if(vis == "hidden" || vis == "collapse") {
			elem.style.visibility = "visible";
			elem.style.display = "block";
		} else {
			elem.style.visibility = "hidden";
			elem.style.display = "none";
		}

	},

	toggleImage: function(identifier, imgdir){
		
		var elem = document.getElementById(identifier);

		if (elem.src == imgdir + "collapse.png") {
			elem.src = imgdir + "expand.png";
		} else {
			elem.src = imgdir + "collapse.png";
		}
		
	},

	generate: function(imgdir, pbid, elemid) {

		var onclick = "Widget.SimpleTree.toggleVisibility('" + elemid + "'); Widget.SimpleTree.toggleImage('" + pbid + "', '" + imgdir + "');";

		var html = '<img src="' + imgdir + 'collapse.png" id="' + pbid + '" onclick="' + onclick + '" alt="Hide Button" />';

		return html;
	},

	write: function(imgdir, pbid, elemid) {

		document.write( Widget.SimpleTree.generate(imgdir,pbid, elemid) );	

	}

};
