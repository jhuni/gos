#!/usr/bin/perl

use strict;
use warnings;

use JSON::DirectoryManifest ':all';

my $manifest = createManifest('.');
open MFILE, ">MANIFEST.json" or die $!;
print MFILE $manifest;
close MFILE;
