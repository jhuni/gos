
CKIT.Class.assign('textpad.view.std.controller', {

	Has: ['name', 'geometry'],
	
	Extends: [GOLDOS.HTMLView],
	
	display: function(container) {
	
		var root = this.createRoot();
		container.appendChild(root);
		
		root.innerHTML += "<textarea id='" + this.encap('textarea') + "'></textarea>";
		
		this.geometry.size.setElementSize(this.get('textarea'));
	
	
	}

});

