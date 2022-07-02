JSAN.use('QEvent');
JSAN.use('GOLDOS.HTMLView');

CKIT.Class.assign('filemgr.view.std.controller', {

	Has: ['name'],
	
	Extends: [GOLDOS.HTMLView],
	
	display: function(parentContainer) {
	
		// Parent wrapper element:
		var container = this.createRoot();
		parentContainer.appendChild(container);
		
		var toolbar = document.createElement("div");
		toolbar.innerHTML += "Location: <input id='" + this.encap('url') + "' type='text' value='' />";
		toolbar.setAttribute("style", "border: 1px solid #000000; padding: 5px;");
		container.appendChild(toolbar);
		
		var filesArea = document.createElement("div");
		filesArea.setAttribute("id", this.encap("files"));
		container.appendChild(filesArea);
	
	},

	attachEvents: function(crtl) {
		
		var view = this;
		QEvent.add(this.get('files'),'mousedown', function(e) {
			
			// Find the element and the filename:
			var elem = e.target;
			var fileName;
			if( elem.tagName.toLowerCase() == 'img' ) {
				fileName = view.decap(elem.parentNode.getAttribute("id"));
			} else {
				fileName = view.decap(elem.getAttribute("id"));
			}
			
			
			if( e.rightClick ) {
				
				crtl.fileRightClick(fileName,new coord(e.page.x,e.page.y) );
				
			} else {
				
				// Send message back to the controller:
				crtl.fileclick(fileName);
				
			}
			
		});
		
		QEvent.add(this.get('url'), 'keypress', function(e) {
			
			if( e.key == 'enter' ) {
				crtl.setURL( e.target.value );	
			}
			
		});
		
	},
	
	setURL: function(value) {
		
		this.get('url').value = value;
		
	},
	
	setFiles: function(ls,folders) {
		
		var filesArea = this.get('files');
		filesArea.innerHTML = '';
		
		for( var i = 0, l = ls.length; i < l; i++ ) {
			
			var fileName = ls[i];
			
			// Find fileExtension:
			var fileExtension = '';
			var fsplit = fileName.split(".");
			if( fsplit.length > 1 ) {
				fileExtension = fsplit[fsplit.length-1];
			}
			
			// Folder Boolean:
			var isFolder = false;
			
			if( fileName.charAt(0) === '/' ) {
				fileName = fileName.substr(1,fileName.length);
				isFolder = true;
			}
			
			var img = "<img src='./apps/filemgr/view/Images/_alt/z1/empty.png' width='40' height='40' />";
			if( isFolder ) {
				img = "<img src='./apps/filemgr/view/Images/_alt/z1/folder.png' width='40' height='40' />";	
			} else if( fileExtension == "png" || fileExtension == "gif" ) {
				img = "<img src='./" + fileName + "' width='40' height='40' />";					
			}
			
			if( fileName[fileName.length-1] != "~" ) {
				filesArea.innerHTML += "<div id='" + this.encap(fileName) + "' style='float:left;width:200px;text-align:center;'>" + img + "<br />" + fileName + "</div>";
			}
			
		}
		
		
	}
	

});

