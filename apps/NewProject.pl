#!/usr/bin/perl

use strict;
use warnings;

my $project = 'awmap';

print "Already a directory!!\n\n" and exit if -d "./$project"; 

mkdir "./$project";
chdir "./$project";

mkdir "./model/";
mkdir "./controller/";
chdir "./controller/";
open(MFILE, ">./main.js");
print MFILE <<HTML;

CKIT.Class.assign('$project.controller.main', {

	Has: ['view'],

	init: function() {
		this.appname = '$project';
	},

	menuClick: function(path) {

	},
	
	resize: function(newGeometry) {
	
	},
	
	keypress: function(e) {
		
	}



});

CKIT.Utils.Base.assign('$project.controller.main.menu', {

});

HTML

close(MFILE);
chdir "..";




open(MFILE, ">./_exe.js");
print MFILE <<HTML;

(function() {

JSAN.use('$project.view.std.controller');
var viewc = $project.view.std.controller;

GOLDOS.Executable.assign('$project.exe', {

	func: function(pid, container, profile) {
		var v = new viewc( pid );
		v.display(container);

		window[pid] = new $project.controller.main( v );
		window[pid].init();
	}

});

})();

HTML
close(MFILE);


open(MFILE, ">./META.json");
print MFILE <<HTML;

{
	
	"name": "$project",
	"version": "1.0",
	"author": "Jhuni <jhuni_x\@yahoo.com>",
	"license": "gpl",

	"requires": [
		"CKIT",
		"GOLDOS.Executable"
	],

	"build_requires": [

	],

	"provides": [
		"$project._exe",
		"$project.controller.main"
	]

}

HTML
close(MFILE);


mkdir "./view/";
chdir "./view/";

mkdir "./Images";
mkdir "./std/";
chdir "./std/";

open(MFILE, ">./controller.js");
print MFILE <<HTML;

CKIT.Class.assign('$project.view.std.controller', {

	Has: ['name'],
	
	Extends: [GOLDOS.HTMLView],
	
	display: function(container) {
	
	}

});

HTML
close(MFILE);

chdir "./../../";


