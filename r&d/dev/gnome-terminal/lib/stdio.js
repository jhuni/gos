
stdio = {};
stdio.stdin = STDIN;
stdio.stdout = STDOUT;
stdio.stderr = STDERR;

stdio.printf = function(){

	STDOUT += arguments[0];
	
}
