/*jsan __header__ */

JSAN.use('CKIT');

/*jsan __end__ */

Joose.Class('GOLDOS.Executable', {
	
	constructor: function(func) {
		this.func = func;
	},
	
	has: {
		func: {}
	},
	
	methods: {
		// Command Line Inteface:
		main: function(argc,argv) {
			
		}
	}
	
});

GOLDOS.pid = 0;

CKIT.Utils.Base.update(GOLDOS.Executable, {
	
	assign: function(ns, obj) {
		var rval = new GOLDOS.Executable();
		CKIT.Utils.Base.update( rval, obj );
		CKIT.Utils.Base.assign( ns, rval );
	}
	
});



/*
function parseArgs(argc,argv) {
	
	var rval = {};
	
	var lastopt = '';
	for( var i = 1; i < argc; i++ ) {
		var mystr = argv[i];
		
		if( mystr.charAt(0) === '-' ) {
			if( mystr.charAt(1) === '-' ) {	
				var opt = mystr.substr(2,mystr.length-2);
				var splits = opt.split("=");
				if( splits.length == 1 ) {
					rval[opt] = true;	
				} else {
					rval[splits[0]] = splits[1];	
				}
			} else {
				lastopt = mystr.substr(1, mystr.length-1);	
			}
		} else {
			if( lastopt != '' ) {
				rval[lastopt] = mystr;
				lastopt = '';		
			}
		}
		
	}
	
	return rval;
	
};*/


