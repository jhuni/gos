if( typeof os == "undefined" ) {
	os = {};	
}

STDOUT = '';
STDIN = '';
STDERR = '';

os.bash = {};
	
os.bash.echo = {
	
main: function(argc, argv) {
	
	for (i=1; i<argc;i++) {
		stdio.printf(argv[i] + " ");
	}
	
}

}
	
