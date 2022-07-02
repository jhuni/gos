#!/usr/bin/perl

use strict;
use warnings;
use Image::LibRSVG;
use File::Slurp;

my $rsvg = new Image::LibRSVG();

chdir("./Images/");
mkdir("./_alt/z1/");

my @files = read_dir('.');
for my $file ( @files ) {
	next if -d $file;

	my @split = split /\./, $file;
	$rsvg->convertAtZoom($file, "./_alt/z1/" . $split[0] . ".png", 1, 1);

}

