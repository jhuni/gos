os = {};

os.shell = {

exec: function(command){
	
	var argv = command.split(/\s+/);
	var argc = argv.length;
	
	if( argv[0] == '' ) {
		argv.shift();
	}
	
	os.bash.echo.main(argc,argv);
	
	
	
},

};
