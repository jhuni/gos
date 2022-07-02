
CKIT.Class.assign('osk.controller.main', {

	Has: ['view'],

	init: function() {
		this.appname = 'osk';
		this.proc = window['proc' + 2];
		
		var self = this;
		this.view.attachEvents( function(key) {
			self.controllerKeyPress(key);
		});
		
	},
	
	controllerKeyPress: function(key) {
		var e = {key: key};
		this.proc.keypress(e);
	},

	menuClick: function(path) {

	},
	
	resize: function(newGeometry) {
	
	}



});

CKIT.Utils.Base.assign('osk.controller.main.menu', {

});

