JSAN.use('IO.Simple._Ajax');


CKIT.Class.assign('filemgr.controller.main', {

	Has: ['view', 'url'],

	init: function() {
		
		this.appname = 'filemgr';
		
		this.view.attachEvents(this);
		
		this.setURL(this.url);
		
	},

	menuClick: function(path) {
		
		if( path == 'Help/About' ) {
			alert("This is the file manager");
		}

	},
	
	keypress: function(e) {
		
	},
	
	resize: function(newGeometry) {
	
	},
	
	// Utils
	isFolder: function(fileName) {
		
		for( var i = 0, l = this.files.length; i < l; i++ ) {
			var file = this.files[i];
			
			if( file.substring(1,file.length) == fileName ) {
				return true;
			}
			
		}
		return false;
		
	},
	
	// Events:
	setURL: function(value) {
		
		this.url = value;
		this.view.setURL(value);
		
		this.files = IO.Simple.ls(this.url);
		this.view.setFiles(this.files);
		
	},
	
	fileclick: function(fileName) {
		
		if( this.isFolder(fileName) ) {
			this.setURL(this.url + fileName + "/");
		} else {
			window.location = ("./" + this.url + fileName);
		}
		
	},
	
	fileRightClick: function(fileName, cd) {

		var self = this;
		
		if( this.isFolder(fileName) ) {
			
			Widget.ContextMenu.create({
				
				menuData: [
					{text:'Open'}
				],
				
				onmenuclick: function(path) {
					if( path === 'Open With/Current Browser' ) {
						window.open("./" + self.url + fileName);
					}
				},
				
				screenCoord: cd
				
			}).display();
			
		} else {
		
			Widget.ContextMenu.create({
				
				menuData: [
					{text:'Open With', children: [
						{text:'Current Browser'},
						{text:'Textpad'}
					]},
					{text:'----'},
					{text:'Rename'},
					{text:'Move To Trash'}
				],
				onmenuclick: function(path) {
					if( path === 'Open With/Current Browser' ) {
						window.open("./" + self.url + fileName);
					} else if( path === "Open With/Textpad" ) {
						
						proc0.loadApp("textpad", {
							text: IO.Simple.slurp(self.url + fileName) 
						});
							
					}
				},
				
				screenCoord: cd
				
			}).display();
		
		}
		
		
	}


});

CKIT.Utils.Base.assign('filemgr.controller.main.menu', [

	{text:'Help', children: [
		{text:'About'}
	]}

]);

