
CKIT.Class.assign('Widget.ContextMenu', {
	
	Has: ['name', 'menuData', 'screenCoord', 'currentHierarchy', 'onmenuclick'],
	
	Extends: [GOLDOS.HTMLView],
	
	Onload: function() {
		
		this.children = {};
		this.activePath = -1;
		
		// currentHierarchy defaults:
		if( typeof this.currentHierarchy === 'undefined' ) {
			this.currentHierarchy = '';
		}
		
		if( typeof this.name === 'undefined' ) {
			this.name = 'ContextMenu' + Widget.ContextMenu._currentNumber;
			Widget.ContextMenu._currentNumber++;
		}
		
		this.width = 225;
		
	},
	
	display: function() {
		var menuData = this.menuData, 
		    screenCoord = this.screenCoord, 
		    id = this.name;
		
		if( typeof Widget.ContextMenu.instances[id] !== 'undefined' ) {
			document.getElementById(id).style.display = 'block';
			return this;	
		}
		
		var root = this.createRoot();
		root.setAttribute("class", "ContextMenu");
		root.setAttribute("style", 'position:absolute; width:' + this.width + 'px;');
		this.root = root;
		
		for( var i = 0; i < menuData.length; i++ ) {
			this.addMenuNode(menuData[i]);
		}
		
		// Place ContexMenu:
		Widget.ContextMenu.container.appendChild(root)
		
		/** Handle the positioning of the ContextMenu: */
		var sz = tbsize.getFromPageElement(root);
		
		if( (screenCoord.y + sz.height) > Widget.ContextMenu.resolution.size.height ) { 
			screenCoord.y -= sz.height;
		}
		
		if( (screenCoord.x + sz.width ) > Widget.ContextMenu.resolution.size.width ) {
			screenCoord.x -= sz.width;
		}
		
		screenCoord.setElementPosition(root);
		
		Widget.ContextMenu.instances[id] = [];

		
		// Return this:
		return this;
	},
	
	addMenuNode: function(mydata) {
		var currentHierarchy = this.currentHierarchy, id = this.name, onmenuclick = this.onmenuclick;
		
		var menuText = mydata.text;
		var subMenuElement = document.createElement("div");
		subMenuElement.setAttribute( "id",  this.encap(menuText) );
		
		if(menuText === "----") {
			subMenuElement.setAttribute("class", "MenuSeperator");
		} else {
			var myIcon = '';
			myIcon += '<div class="IconContainer">';
			if( mydata.icon ) {
				myIcon += '<img style="width: 100%; height: 100%;" src="' + mydata.icon + '" alt="Icon"></img>';	
			}
			myIcon += '</div>';
			
			subMenuElement.innerHTML += myIcon + '<div class="MenuText">' + menuText + '</div>';
					
			subMenuElement.setAttribute('class', 'MenuItem');
			
			/* Attach the events: */
			QEvent.add(subMenuElement, 'click', function() {
				onmenuclick(currentHierarchy + menuText);	
			});
			
			var self = this;
			QEvent.add(subMenuElement, 'mouseover', function(e) {
				self.set('activePath', menuText);
				subMenuElement.setAttribute("class","MenuItemActive");	
				var sid = id+menuText;
				
				if( mydata.children ) {
					if( typeof self.children[menuText] != "undefined" ) {
						self.children[menuText].set('isVisible', true);
					} else {
						Widget.ContextMenu.instances[id].push(sid);
						var cd = coord.getFromPageElement(subMenuElement);
						var sz = tbsize.getFromPageElement(subMenuElement);
						cd.x += sz.width;
						
						self.children[menuText] = Widget.ContextMenu.create({
							name: sid,
							menuData: mydata.children,
							screenCoord: cd,
							currentHierarchy: currentHierarchy+menuText+'/',
							onmenuclick: onmenuclick
						}).display();
					}
				}
				
			});
			
		}
		
		this.root.appendChild(subMenuElement);
		return this;
	},
	
	destroy: function() {
		this.root.parentNode.removeChild(this.root);
		
		for( var i in this.children ) {
			this.children[i].destroy();
		}
	},
	
	set: function(key,value) {
		
		// isVisible
		// Makes this invisible and all of the children too if necessary
		if( key === 'isVisible' ) {
			this.root.style.display = (value) ? 'block' : 'none';
			
			if( !value ) {
				for( var i in this.children ) {
					this.children[i].set('isVisible', false);
				}
			}
			
		// activePath deals with what is the curerrently selected menuNode.
		} else if( key === 'activePath' ) {
			
			if( this.activePath == value ) {
				return;
			}
			
			if( this.activePath != -1 ) {
				this.get(this.activePath).setAttribute("class","MenuItem");
			}
			
			for( var i in this.children ) {
				this.children[i].set('isVisible', false);
			}
			
			this.activePath = value;
			
		}
		
	}
	
});



/* Widget.ContextMenu */
Widget.ContextMenu.extend({
	
	_currentNumber: 0,
	
	resolution: Shape.Rect.fromNums(0,0,0,0),
	
	container: document.body,
	
	instances: {}
	
});



// Hide menus on mouse click

/*
QEvent.add(document, "mousedown", function(e) {

	if( !e.rightClick ) {
		
		for( var i in Widget.ContextMenu.instances ) {
			if( Widget.ContextMenu.instances.hasOwnProperty(i) ) {
				document.getElementById(i).style.display = 'none';
			}
		}
	}
	
});
*/






/*


=head1 NAME

Widget.ContextMenu

=head1 PROPERTIES

isVisible: boolean
activePath: String or -1

menuData: data behind the event
currentHierarchy: String

screenCoord: coord
id: String

children: Object

=head1 EVENTS

onmenuclick: Event Function

=head1 METHODS

display()
destroy() - destroys this and all children
set() - setter method


*/
