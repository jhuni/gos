JSAN.use('QEvent');
JSAN.use('GOLDOS.HTMLView');

CKIT.Class.assign('desktop.view.std.controller', {

	Has: ['name', 'geometry'],

	Extends: [GOLDOS.HTMLView],
	
	Onload: function() {
		var sz = Math.floor(Math.min(this.geometry.size.width/10,this.geometry.size.height/10));
		this.iconsize = new tbsize(sz,sz);
	},
	
	display: function(container) {
	
		var root = this.createRoot();
		this.geometry.size.setElementSize(root);
		root.style.backgroundImage = "url(./apps/desktop/view/Images/_alt/z1/background.png)";
		
		container.appendChild(root);
		this.root = root;
	
		this.viewDeskItem( {
			text:'Task Manager', 
			icon:'./apps/taskmgr/view/Images/_alt/z1/icon.png',
			coord: new coord(10,60),
			command: function() {
				window["proc0"].loadApp('taskmgr');
			}
		} );
		
		this.viewDeskItem( {
			text:'Go',
			icon: './apps/goban/view/Images/_alt/z1/icon.png',
			coord: new coord(10,225),
			command: function() {
				window["proc0"].loadApp('goban');	
			}
		});
		
		this.viewDeskItem( {
			text: 'Todo',
			icon: './apps/desktop/view/Images/_alt/z1/text-x-generic.png',
			coord: new coord(10,375),
			command: function() {
				var val = IO.Simple.slurp("./home/jhuni/Documents/Todo");
				alert(val);
			}
		});
			
	},
	
	viewDeskItem: function(data) {
		
		var deskItem = document.createElement("div");
		deskItem.style.width = this.iconsize.width+20;
		deskItem.style.textAlign = 'center';
		deskItem.innerHTML = "<img src='" + data.icon + "' width='" + this.iconsize.width + "' height='" + this.iconsize.height + "'></img><br />" + data.text;
		deskItem.style.position = "absolute";
		deskItem.setAttribute("selected", "false");
		
		QEvent.add(deskItem, 'click', function(e) {
			
			if( deskItem.getAttribute("selected") === "false") {
				deskItem.style.backgroundColor = 'black';
				deskItem.style.color = 'white';
				deskItem.setAttribute("selected", "true");
			} else {
				deskItem.style.backgroundColor = 'transparent';
				deskItem.style.color = 'black';
				deskItem.setAttribute("selected", "false");
				
				data.command();
			}
				
		});
		
		coord.sum(data.coord, this.geometry.coord).setElementPosition(deskItem);
		this.root.appendChild(deskItem);
		
	}

});

