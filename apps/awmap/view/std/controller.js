(function() {

JSAN.use('GOLDOS.HTMLView');
JSAN.use('QEvent');
JSAN.use('YAHOO');
JSAN.use('YAHOO.util.Dom');
JSAN.use('YAHOO.util.Event');
JSAN.use('YAHOO.util.Element');
JSAN.use('YAHOO.widget.TabView');
JSAN.use('awmap.view.std.structure');

var getTerrainImage = function(val) {
	return "./apps/awmap/view/Images/terrain/" + (new awmap.model.tile(val)).getName() + ".gif";
};

var getUnitImage = function(val) {
	return "./apps/awmap/view/Images/units/" + (new awmap.model.unit(val)).getName() + ".gif";
}

CKIT.Class.assign('awmap.view.std.controller', {

	Has: ['name'],
	
	Extends: [GOLDOS.HTMLView],
	
	display: function(container) {
	
		var sz = new tbsize(15, 15);
		
		var self = this;
		var i = 0;
		
		var s = new awmap.view.std.structure(this.name);
		var html = s.ribbon(this.name);
		
		html += "<table border='0' cellpadding='0' cellspacing='0' id='" + this.encap('map') + "'>";
		sz.loopGrid( function(cd) {
			
			if( cd.x === 0 ) {
				html += "<tr>";
			} else if( cd.x == sz.width ) {
				html += "</tr>";
			}
			
			var img = getTerrainImage(1);
			html += "<td style='width:16px;height:16px;margin:0px;padding:0px;'>";
			html += "<img width='16' height='16' id='" + self.encap('cell' + i) + "' src='" + img + "' />";
			html += "</td>";
			
			i++;
		} );
		html += "</table>";
		
		container.innerHTML += html;
		
		
		// Deal with the ribbon:
		var tabview = new YAHOO.widget.TabView(  this.encap('ribbon') );
		
		for( var i = 0; i < 154; i++ ) {
			this.get('terraintab').innerHTML += "<img src='" + getTerrainImage(i) + "' id='" + this.encap('select' + i) + "'></img>";
		}
	
	},
	
	setTerrainIndex: function(index,value) {
	
		// Terrain goes up to 148
		var elem = this.get('cell'+index);
		
		if( value >= 154 ) {
			return;
		} else {
			elem.src = getTerrainImage(value);
		}
		
		
	},
	
	setUnitIndex: function(index,value) {
		
		var elem = this.get('cell'+index);
		
		if( value >= 352 ) {
			return;
		} else if( value === 0 ) {
			// Delete unit:
		} else { 
			elem.src = getUnitImage(value);
		}
		
		
	},
	
	attachEvents: function(crtl) {

		var view = this;
	
		// Map click:
		QEvent.add(this.get('map'), 'click', function(e) {
			
			var myid = view.decap(  e.target.getAttribute("id")  );
			myid = myid.replace("cell","");
			crtl.clickCellIndex( parseInt(myid, 10) );
			
		});	
		
		// Select a terrain:
		QEvent.add(this.get('terraintab'), 'click', function(e) {
			
			var id = view.decap(e.target.getAttribute("id"));
			id = id.replace("select", "");
			
			crtl.changeSelection( "terrain", parseInt(id, 10) );
			
		});	
		
		// Select a unit:
		QEvent.add(this.get('unitnav'), 'click', function(e) {
		
			var id = view.decap(e.target.getAttribute("id"));
			id = id.replace("selectunit","");
			
			crtl.changeSelection( "unit", parseInt(id,10) );
		
		});
		
		// Save map:
		QEvent.add(this.get('savecom'), 'click', function(e) {
			crtl.save();
		});
		
		// Export:
		QEvent.add(this.get('exportcom'), 'click', function(e) {
			crtl.exportAWBW();
		});
		
		// Deal with the unitnav:
		QEvent.add( this.get('unitselector'), 'change', function(e) {
			
			var elem = view.get("unitnav");
			var unitscount = 25;
			var start = (this.selectedIndex*unitscount)+1;
			
			elem.innerHTML = "";
			
			for( var i = start, l = start+unitscount; i < l; i++ ) {
				elem.innerHTML += "<img src='" + getUnitImage(i) + "' id='" + view.encap('selectunit' + i) + "' />";
			}
			
		});
		
	}



});





})();

