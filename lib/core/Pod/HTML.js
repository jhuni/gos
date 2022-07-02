(function() {

var startsWith = function(str, startVal) {
	
	var starts = true;
	for( var i = 0; i < startVal.length; i++ ) {
		if( startVal.charAt(i) !== str.charAt(i) ) {
			starts = false;
			break;
		}
	}
	return starts;
	
};

var escapeTags = function(str) {
	return str.replace(/</g,"&lt;").replace(/>/g,"&gt;");
};

	
if( typeof Pod === 'undefined' ) {
	Pod = {};
}

Pod.HTML = {
	
	convert: function(pod) {
		
		var rval = "";
		var toc = "<div class='TableHead'>Table Of Contents:</div><div class='TableOfContents'>";
		
		var lines = pod.split("\n");
		var isCode = false;
		var isHTML = false;
		
		for( var i = 0, l = lines.length; i<l; i++ ) {
			var line = (isHTML) ? lines[i] : escapeTags(lines[i]);
			var href = i.toString();
			
			if( startsWith(line, "=begin html") ) {
				isHTML = true;
				continue;
			} else if( startsWith(line, "=end html") ) {
				isHTML = false;	
				continue;
			} else if( startsWith(line, "=head1") ) {
				line = line.replace(/^=head1\s+/,'');
				toc += "<a href='#" + href + "'>" + line + "</a><br/>";
				line = "<div class='Head1'><a name='" + href + "'></a>" + line + "</div>";
			} else if( startsWith(line, "=head2") ) {
				line = line.replace(/^=head2\s+/,'');
				toc += "&nbsp;&nbsp;&nbsp;&nbsp;<a href='#" + href + "'>" + line + "</a><br/>";
				line =  "<div class='Head2'><a name='" + href + "'></a>" + line + "</div>";
			} else if( startsWith(line, "=head3") ) {
				line = line.replace(/^=head3\s+/,'');
				toc += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='#" + href + "'>" + line + "</a><br/>";
				line = "<div class='Head3'><a name='" + href + "'></a>" + line + "</div>";
			} else {
				line += "<br/>";
			}
			
			if( line.match(/^(\t| )/) ) {
				line = line.replace(/ /g, "&nbsp;");
				line = line.replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;");
				
				if( !isCode ) {
					line = "<div class='Code'>" + line;
					isCode = true;
				}
			} else {
				if( isCode ) {
					line += "</div><br/>";
					isCode = false;
				}
			}
			
			rval += line;
		}
		
		toc += "</div>";
		return toc + rval;
		
	}
	
};


})();



/*

=pod

=head1 NAME

Pod.HTML - convert from POD to HTML with JavaScript

=head1 SYNOPSIS

	var mypod = "=pod\n=head1 NAME\n\nPod.HTML\n\n=cut\n";
	var myhtml = Pod.HTML.convert(mypod);

=head1 DESCRIPTION

Generally POD is converted to HTML using Perl, however, Perl cannot run on the client-side so this module essentially gives more power to the client-side user. The entire module is encapsulated in a single function (Pod.HTML.convert) which will do all the work for you.

=head1 DEPENDENCIES

None.

=head1 FUNCTIONS

=head2 convert(String pod) Returns String

This function converts a POD String to a String of HTML code.

=head1 AUTHORS

Jhuni, <jhuni_x@yahoo.com>

=head1 COPYRIGHT

Public Domain

=cut

*/
