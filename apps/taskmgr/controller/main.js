
CKIT.Class.assign('taskmgr.controller.main', {

	Has: ['view'],
	
	Onload: function() {
		this.appname = 'taskmgr';
	},

	init: function() {
		
		this.view.changeTaskSet(0,true);
		
		var children = window["proc0"].children;
		
		for( var i = 0; i < children.length; i++ ) {
			this.view.changeTaskSet(children[i], true);	
		}
		
		this.view.attachEvents(this);
		
	},

	menuClick: function(path) {

		if( path === 'Help/About' ) {
			alert("Task manager created by jhuni.");	
		}

	},
	
	resize: function(newGeometry) {
	
	}

});

CKIT.Utils.Base.assign('taskmgr.controller.main.menu', [

	{text:'Help', children:[
		{text:'About'}
	]}

]);

