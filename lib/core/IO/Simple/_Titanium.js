/*jsan __header__ */

JSAN.use('CKIT');

/*jsan __end__ */

CKIT.Utils.Base.assign('IO.Simple', {
	
	root: "/home/jhuni/lib/Programming/JavaScript/Titanium/Projects/GoldOS/GoldOS/Resources/",
	//root: Titanium.Filesystem.getResourcesDirectory() + "/",
	
	ls: function(dirname) {
		
		var dir = Titanium.Filesystem.getFile(IO.Simple.root + dirname);
		
		var files = dir.getDirectoryListing();
		var ls = [];
		
		for( var i = 0, l = files.length; i < l; i++ ) {
			ls[i] = files[i].name();
		}
		
		return ls;
		
	},
	
	mkdir: function(dirname) {
	
		var dir = Titanium.Filesystem.getFile(IO.Simple.root + dirname);
		
		if( !dir.exists() ) {
			dir.createDirectory();
		}
	
	},
	
	slurp: function(filename) {
	
		var file = Titanium.Filesystem.getFile(IO.Simple.root + filename);

		return file.read();
				
	},
	
	write: function(filename, data) {
		
		var file = Titanium.Filesystem.getFile(IO.Simple.root + filename);
		
		file.write(data);
		
	},
	
	rm: function(filename) {
		
		var file = Titanium.Filesystem.getFile(IO.Simple.root + filename);
		
		if( file.isFile() ) {
			file.deleteFile();
		}
		
	},
	
	mv: function(startname, endname) {
		
		var file = Titanium.Filesystem.getFile(IO.Simple.root + startname);
		
		file.move(IO.Simple.root + endname);
		
	}

	
});

