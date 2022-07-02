
CKIT.Class.assign('textpad.controller.main', {

	Has: ['view', 'text'],

	init: function() {
		
		this.appname = 'textpad';
		
		this.view.get('textarea').value = this.text;
		
	},

	menuClick: function(path) {

		if( path == "Help/About" ) {
			alert("This is a text editor!");	
		}

	},
	
	resize: function(newGeometry) {
		newGeometry.size.setElementSize(this.view.get('textarea'));
	},
	
	keypress: function(e) {
		
	}
	

});

CKIT.Utils.Base.assign('textpad.controller.main.menu', [

	{text:'File', children: [
		{text: 'New'},
		{text: 'Open'},
		{text: 'Save'},
		{text: '----'},
		{text: 'Quit'}	
	]},
	
	{text:'Edit', children: [
		{text: 'Undo'},
		{text: 'Redo'}
	]},
	
	{text:'Help', children: [
		{text: 'About'}
	]}

]);

