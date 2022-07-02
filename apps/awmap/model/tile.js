(function() {
	
var terrainNames = [

	"blacksqr",
	"plain",
	"wood",
	"mountain",
	
	"hriver",
	"vriver",
	"criver",
	"esriver",
	"swriver",
	"wnriver",
	"neriver",
	"eswriver",
	"swnriver",
	"wneriver",
	"nesriver",
	
	"hroad",
	"vroad",
	"croad",
	"esroad",
	"swroad",
	"wnroad",
	"neroad",
	"eswroad",
	"swnroad",
	"wneroad",
	"nesroad",
	
	"hbridge",
	"vbridge",
	
	"sea",
	"reef",
	
	"hshoal",
	"hshoaln",
	"vshoal",
	"vshoale",
	
	"vpipe",
	"hpipe",
	"nepipe",
	"espipe",
	"swpipe",
	"wnpipe",
	"npipeend",
	"epipeend",
	"spipeend",
	"wpipeend",
	
	"missilesilo",
	"missilesiloempty",
	
	"hpipeseam",
	"vpipeseam",
	"hpiperubble",
	"vpiperubble"
	
];

var armies = [

	"os",
	"bm",
	"ge",
	"yc",
	"bh",
	"rf",
	"gs",
	"bd",
	"ab",
	"js",
	"ci",
	"pc",
	"tg",
	"pl",
	"ne"

];	

var propertyNames = [
	
	"airport",
	"base",
	"city",
	"comtower",
	"lab",
	"port",
	"hq"

];

Joose.Class("awmap.model.tile", {
	
	constructor: function(id) {
		this.id = id;
	},
	
	has: {
		id: {}
	},

	methods: {
	
		getName: function() {
		
			var id = this.id;
			
			if (id < 50) {
				
				// We are dealing with a terrain tile:
				return terrainNames[id];
				
			} else {
				
				// Otherwise we are dealing with a property:
				id -= 50;
				var armie = Math.floor(id/7);
				id -= armie*7;
				
				return( armies[armie] + "/" + propertyNames[id] );
				
			}
		
		}
	
	}
	
});



})();
