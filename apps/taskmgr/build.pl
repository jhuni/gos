#!/usr/bin/perl

use strict;
use warnings;
use JavaScript::Minifier;
use CSS::Minifier;
use File::Slurp;
use boolean;
use JSON::XS;

use lib './../../lib/perl/';
use JavaScript::SimpleTemplate;


# Get the meta data:
my $data = decode_json(read_file './META.json');
my $providesBase = './../';
my @provides = @{$data->{'provides'}};

# Configuration:
my $viewName = "canvas";
my $view = "./view/$viewName/";
my $minify = false;

# Structure Files:
my $structureFile = $view . 'structure.xml';
my $structureData = JavaScript::SimpleTemplate::interpretStructureFile($structureFile, $data->{'name'}, $viewName);

# Get the CSS from the CSS directory
my $css = (sub{
	my $cssDir = $view . "./css/";
	return '' unless -d $cssDir;	

	my $rval = '';
	my @files = read_dir($cssDir);
	for my $file (@files) {
		$rval .= read_file($cssDir . $file);
	}

	$rval = CSS::Minifier::minify( input => $rval );
	return $rval;
})->();


# Start to create the document:
my $text = '';

# Get the requirements for the executable file.
$text .= convertRequiresToJS( @{  $data->{'requires'}  } );
$text .= convertRequiresToJS( @{ $data->{'provides'} } );

$text .= $structureData;
$text .= "(new YAHOO.util.StyleSheet('$css')).enable();" if $css ne '';

# Minify everything if necessary:
$text = JavaScript::Minifier::minify(input=>$text) if $minify;

write_file("./exe.js", $text);







sub convertProvidesToJS {
	my @provides = @_;
	my $js = '';

	for my $i ( @provides ) {
		$i =~ s/\./\//g; # Convert the package dots to a path.
		my $filePath = $providesBase . $i . ".js";
		$js .= read_file($filePath);
	}

	return $js;
}

sub convertRequiresToJS {
	my $js = '';
	my @requirements = @_;
	
	for my $i ( @requirements ) {
		$js .= "JSAN.use('$i');\n";
	}

	return $js;
}



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
Lang.Utils.assign('$packageName.view.$viewName.structure', (function(){

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

$rval .= "
}; // End Prototype

return pkg;
})()  );

";

	return $rval;

}
