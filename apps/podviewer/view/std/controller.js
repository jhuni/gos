JSAN.use('GOLDOS.HTMLView');

CKIT.Class.assign('podviewer.view.std.controller', {

	Has: ['name'],
	
	Extends: [GOLDOS.HTMLView],
	
	display: function(container) {
		
		var root = this.createRoot();
		root.setAttribute("class", "podviewer");
		container.appendChild(root);

		root.innerHTML += Pod.HTML.convert(this.pod);
		
		root.style.margin = '60px 10px 0px 10px';
		root.style.height = this.geometry.size.height-20 + 'px';
		root.style.overflow = "auto";
		
		//root.innerHTML += "<textarea id='" + this.encap('textbox') + "'>" + this.pod +  "</textarea>";
		//this.geometry.size.setElementSize( this.get('textbox') );	
	
	}

});

