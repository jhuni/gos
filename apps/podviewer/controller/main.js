
CKIT.Class.assign('podviewer.controller.main', {

	Has: ['view'],

	Onload: function() {
		this.appname = 'podviewer';
	},

	init: function() {
		
	},

	menuClick: function(path) {

		if( path == "Help/About" ) {
			alert("Podviewer is part of GoldOS");
		}

	},
	
	resize: function(newGeometry) {
		this.view.geometry = newGeometry;
		this.view.redisplay();
	}

});

CKIT.Utils.Base.assign('podviewer.controller.main.menu', [
	
	{text:'Help', children: [
		{text:'About'}	
	]}
	
]);

