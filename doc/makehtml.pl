#!/usr/bin/perl

use strict;
use warnings;
use Pod::Simple::HTMLBatch;

mkdir "./html";

opendir(MDIR, ".");
Pod::Simple::HTMLBatch->batch_convert(
'./pod/',
'./html/'
);
closedir(MDIR);
