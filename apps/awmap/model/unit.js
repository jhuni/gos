(function() {

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

var units = [

	"anti-air",
	"apc",
	"artillery",
	"battleship",
	"b-copter",
	"blackboat",
	"blackbomb",
	"bomber",
	"carrier",
	"cruiser",
	"fighter",
	"infantry",
	"lander",
	"md.tank",
	"mech",
	"megatank",
	"missile",
	"neotank",
	"piperunner",
	"recon",
	"rocket",
	"stealth",
	"sub",
	"tank",
	"t-copter"

];

Joose.Class('awmap.model.unit', {
	
	constructor: function(id) {
		this.id = id;
	},
	
	has: {
		id: {}
	},
	
	methods: {
		
		getName: function() {
			var value = this.id;
			var armieNumber = Math.floor((value-1)/25);	
			var armie = armies[armieNumber];
			var unit = units[value-1-armieNumber*25];
			
			return( armie + '/' + armie + unit  );	
		}
		
	}
	
});



})();
