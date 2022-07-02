(function() {





// This function returns the awbw value for some terrain name,
// for example convertProperty("os/base") = "f"

var convertProperty = function(terrainName) {
	
	var properties = [

		// [os] city, base, airport, port, hq
		"e",
		"f",
		"g",
		"h",
		"i",
		
		// [bm] city, base, ...
		"j",
		"l",
		"m",
		"n",
		"o",
		
		// [ge]
		"p",
		"q",
		"r",
		"s",
		"t",
		
		// [yc]
		"u",
		"v",
		"w",
		"x",
		"y",
		
		// [bh]
		"1",
		"2",
		"3",
		"4",
		"5",
		
		// [rf]
		"U",
		"T",
		"S",
		"R",
		"Q",
		
		// [gs]
		"Z",
		"Y",
		"X",
		"W",
		"V",
		
		// [bd]
		"6",
		"7",
		"8",
		"9"
		
	];

	// The values:
	var propertyArmies = new CKIT.List( ["os","bm","ge","yc","bh","rf","gs","bd"] );
	var propertyTypes = new CKIT.List( ["city","base","airport","port","hq"] );
	
	// Split into armie and propertyType:
	var splitedName = terrainName.split("/");
	
	var armie = propertyArmies.indexOf(splitedName[0]);
	var propertyType = propertyTypes.indexOf(splitedName[1]);
	
	if (armie != -1 && propertyType != -1) {
		return( properties[ (armie*5) + propertyType ] );
	}
	
	return -1;
	
};






// Convert a single tile to AWBW:
awmap.model.tile.meta.extend({
	
	// This will take any value in the json number format and convert
	// it to the awbw format.
	// (new tile(0)).toAWBW() = ".";
	methods: {
		toAWBW: function() {
			
			var val = this.id;
			
			// This works for plains, roads, rivers, and bridges, but
			// not for pipes.
			var awbwFormat = [

				"0",
				".",
				"@",
				"^",
				
				"{",
				"}",
				"~",
				"I",
				"J",
				"K",
				"L",
				"M",
				"N",
				"O",
				"P",
				
				"-",
				"=",
				"+",
				"A",
				"B",
				"C",
				"D",
				"E",
				"F",
				"G",
				"H",
				
				"[",
				"]",
				
				",",
				"%",
				
				"<",
				"(",
				">",
				")"

			];
			
			// AWBW format makes no sense.
			var miscValues = {
				
				"ab/comtower": "_",
				"ne/city": "a",
				"ne/base": "b",
				"ne/airport": "c",
				"ne/port": "d"
				
			};

			var rval = ".";
			
			if (val < 50) {
				if (val < awbwFormat.length) {
					return awbwFormat[val];
				}
			} else {
				
				var terrainName = this.getName();
			
				// For some reason the ab comtower works:	
				if (typeof miscValues[terrainName] != "undefined") {
					return miscValues[terrainName];
				}
				
				// Try to access the properties array: 
				var propertyValue = convertProperty(terrainName);
				
				if (propertyValue != -1) {
					return propertyValue;
				}
				
				
			}
			
			return rval;
			
		}
	}
	
});


// Convert an entire map to AWBW:
awmap.model.map.meta.extend({
	
	methods: {
		
		toAWBW: function() {
			
			var rval = '';
			var terrain = this.terrain;
			
			terrain.size.loopGrid( function(cd) {
				
				if( cd.x === 0 && cd.y !== 0 ) {
					rval += "\n";	
				}
				
				rval += (new awmap.model.tile(terrain.get(cd))).toAWBW();
				
			} );
			
			return rval;
		}
		
	}
	
});





})();
