#!/usr/bin/perl

use strict;
use warnings;

open(MFILE, "./level002.gnl");

my @lines = <MFILE>;

print "var myarray = [";
for( my $i = 0; $i < scalar(@lines); $i++ ) {
	my $val = $lines[$i];
	$val =~ s/\n//g;
	print '"' . $val . '"';

	if( $i != $#lines ) {
		print ",";
	}

}
print "];";

close(MFILE);
