JSAN.use('GOLDOS.HTMLView');
JSAN.use('QEvent');
JSAN.use('YAHOO');
JSAN.use('YAHOO.util.StyleSheet');
JSAN.use('osk.view.std.structure');

CKIT.Class.assign('osk.view.std.controller', {

	Has: ['name', 'geometry'],
	
	Extends: [GOLDOS.HTMLView],
	
	Onload: function() {
		this.cellHeight = (this.geometry.size.height-30)/6;	
		this.cellWidth = Math.round(this.geometry.size.width/42);
	},
	
	display: function(container) {
		var s = new osk.view.std.structure(this.name);
		var myhtml = s.keyboard();
	
		var root = this.createRoot();
		root.setAttribute("class", "osk");
		root.innerHTML = myhtml;
		container.appendChild(root);
	
		this.get('input').style.width = this.geometry.size.width;
		this.get('input').style.height = 26;
		
		var elems = this.get('').getElementsByTagName("td");
	
		for( var i = 0, l = elems.length; i < l; i++ ) {
			var elem = elems[i];
			elem.style.height = this.cellHeight;
			
			var sz = elem.getAttribute("sz");
			if( sz !== null ) {
				elem.style.width = (parseInt(sz)*this.cellWidth)-1;
			}
			
			QEvent.add(elem, 'mouseover', function(e) {
				e.target.setAttribute("class", "selected");
			});
			
			QEvent.add(elem, 'mouseout', function(e) {
				e.target.setAttribute("class", "");
			});
		}
		
	},
	
	attachEvents: function(controllerKeyPress) {

		QEvent.add(this.get(''), 'click', function(e) {
			var elem = e.target;
			
			if( elem.tagName.toLowerCase() === 'td' ) {
				var key = elem.innerHTML.toLowerCase();
				if( key.match(/^\s+$/) ) { 
					key = 'space'; 
				} else if( key === 'bksp' ) {
					key = 'backspace';
				}
				controllerKeyPress(key);
			}
		});
		
		QEvent.add(this.get('input'), 'keypress', function(e) {
			
			controllerKeyPress(e.key);
			
		});
		
	}

});

