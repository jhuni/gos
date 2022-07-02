package JavaScript::SimpleTemplate;

use strict;
use warnings;
use boolean;
use XML::XPath;
use XML::XPath::XMLParser;


# (Str $filePath, Str $viewName, Str $packageName)
sub interpretStructureFile {

	# Arguments:
	return '' unless -f $_[0];
	my $xp = XML::XPath->new(filename => $_[0]);
	my $packageName = $_[1];
	my $viewName    = $_[2];


	my $nodes = $xp->find('//@id'); # Find all id's.

	foreach my $node( $nodes->get_nodelist ) {

		$node->setNodeValue("' + this.encap('" . $node->getNodeValue() . "') + '");

	}

	# header:
my $rval = "
CKIT.Utils.Base.assign('$packageName.view.$viewName.structure', (function(){

var pkg = function(name) {
	this.name = name;
};

pkg.prototype = {


encap: function() {
	return( this.name + arguments[0] );
},
" . ("\n" x 1);
	my $nodeset = $xp->find('/*/*'); # find all views

	foreach my $node ($nodeset->get_nodelist) {

		my $funcname = $node->getName;
		my $body = "";
		my @children = $node->getChildNodes();

		for my $i ( @children ) {
			$body .=  XML::XPath::XMLParser::as_string($i);
		}

		$body =~ s/\n//g;
		#$body =~ s/'/\\'/g;

		my @matches = split(/{\$/, $body);
	
		$body = $matches[0];

		for( my $i = 1; $i < scalar(@matches); $i++ ) {
			my @splits = split("}", $matches[$i]);
			my $arg = $splits[0];
			$body .= "' + $splits[0] + '$splits[1]";	
		}

		# get args
		my @args = split(/\s+/, $node->getAttribute("args"));
		my $argt = join(", ", @args);
		


# HEREDOC:
$rval .= <<HTML;
$funcname: function($argt) { 
	return('$body');
},
HTML
# END

		$rval .="\n" x 1;

	}

chop($rval);chop($rval);chop($rval);

$rval .= "
}; // End Prototype

return pkg;
})()  );

";

	return $rval;

}


1;
