Joose.Class("awmap.controller.main", {
	
	constructor: function(view) {
		//Handle Arguments:
		this.view = view;
		
		//Onload:
		this.appname = 'awmap';
		
		var sz = new tbsize(15,15);
		this.map = new awmap.model.map(  Grid.fromRepetition(1,sz), Grid.fromRepetition(0,sz)  );
		
		// Associate with the view:
		var view = this.view;
		this.map.terrain.setIndex = function(index,value) {
			this.v[index] = value;
			view.setTerrainIndex(index,value);
		};
		
		this.map.units.setIndex = function(index,value) {
			this.v[index] = value;
			view.setUnitIndex(index,value);
		};

		// Other Variables:		
		this.sel = {
			type: "terrain",
			value: 0
		};
		
		
		//var mapdir = "./home/jhuni/Advance Wars Maps/";
		//var data = eval( '(' + IO.Simple.slurp(mapdir + "/Jhuni's Maps/Defend Yourself") + ')' );
		//this.map.terrain.setValuesToList( new CKIT.List(data.terrain) );
		
	},
	
	has: {
		view: {}
	},
	
	methods: {
		
		init: function() {
			this.view.attachEvents(this);
		},
		
		// View Events:
		clickCellIndex: function(index) {
			
			var sel = this.sel;
			
			if( sel.type == "unit" ) {
				this.map.units.setIndex(index, sel.value);
			} else {
				this.map.terrain.setIndex(index,sel.value);	
			}
			
		},
		
		changeSelection: function(type, newSel) {
			
			this.sel.type = type;
			this.sel.value = newSel;
			
		},
		
		save: function() {
			
			for (i in this.map) {
				if (this.map.hasOwnProperty(i)) {
					alert(i);	
				}
			}
			
		},
		
		exportAWBW: function() {
			
			JSAN.use('awmap.model.awbw');
			alert( this.map.toAWBW() );
			
		},
		
		analyze: function() {
			
			if( typeof awmap.model.analyzer == "undefined" ) {
				JSAN.use('awmap.model.analyzer');	
			}
			
			awmap.model.analyzer.analyze(this.map);
			
		},
		
		// Common Events:
		menuClick: function(path) {

		},
		
		resize: function(newGeometry) {
		
		},
		
		keypress: function(e) {
			
		}
		
	}
	
});


CKIT.Utils.Base.assign('awmap.controller.main.menu', [

	{text:'File', children: [
		{text: 'New'}	
	]},
	
	{text:'Help', children: [
		{text: 'About'}
	]}

	
]);

