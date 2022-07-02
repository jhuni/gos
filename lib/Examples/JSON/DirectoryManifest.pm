#!/usr/bin/perl

package JSON::DirectoryManifest;

# Dependencies:
use strict;
use warnings;
use boolean;
use base 'Exporter';


# Default Variables
our $VERSION = '1.00';
our @EXPORT = qw();
our @EXPORT_OK = qw(createManifest);
our %EXPORT_TAGS = (  
all => [qw(createManifest)]
);


=pod

=head1 NAME

JSON::DirectoryManifest

=head1 DESCRIPTION

This takes the path to a directory and then it returns a JSON file for the specified
directory. The JSON file has a hierarchical model equivalent to the directory structure.
For example:

	{
		'Directory1': {
			'SubDirectory': {
			}
			'./File1.txt':{},
			'./File2.js':{}
		},
				
		'Directory2': {
			'./index.html': {},
			'./meta.json': {},
			'./screenshot.png': {} 
		}
	}

Every single file in the Manifest is going to be a JavaScript object. If the file is 
not a directory -d then the file is going to have a slash in it which is not valid in 
directory names so there isn't a conflict. It will be prefixed with './' which
can easily be removed later by the JavaScript processor if so desired.

=head1 METHODS

=head2 Str createManifest(Str $directoryPath)

This function takes the exact path to the directory in which you are going to create a
manifest for as described previously. 

Usage:

	use JSON::DirectoryManifest ':all';
	open MFILE, ">MANIFEST" or die $!;
	print MFILE createManifest('.');
	close MFILE;					

This is what it is generally used for: generate a MANIFEST file relative to the current
index and use this in some JavaScript code.

=head1 AUTHOR

Jhuni <jhuni_x@yahoo.com>

=head1 COPYRIGHT

GNU General Public License


=cut


sub createManifest {
	
	my ($directoryPath) = @_;
	my @files = getFilesFromDirectory($directoryPath);
	
	# In order to get the actual size of the Array by not including
	# the values ['.', '..'] you have to subtract two.
	# The reason for this variable is that in JSON the last value
	# in a list does not need a comma.
	my $currentIndex = scalar(@files) - 2; 
	
	my $jsonManifest = "{\n";
	
	for my $file (@files) {
	
		my $fullPath = $directoryPath . '/' . $file;
		my $fileExtens = getFileExtension($file);
		
		# There is no need for . and .. all over our manifest file!
		next if isRelativeDirectory($file);
		
		# This is recursive if you fall upon another directory.
		if( -d $fullPath ) {
			$jsonManifest .= "'$file':" . createManifest($fullPath);
		} else {
			$jsonManifest .= "'./$file':{}";
		}

		# JSON requires commas except for in the last index of the hash.
		if( $currentIndex != 1) {
			$jsonManifest .= ',';
			$currentIndex--;
		}
		
		$jsonManifest .= "\n";
	
	}
	
	$jsonManifest .= "}";
	
	return $jsonManifest;
	
}









#--------------------------------------------------------
# Utility Functions
#--------------------------------------------------------



# 	getFilesFromDirectory($directoryPath)
# 		This is a simple subroutine to make it simpler to get
# 		the files from a directory. This handles the directory reading issues for you.

sub getFilesFromDirectory {

	(my $directoryPath) = @_;

	opendir MDIR, $directoryPath;
	my @files = readdir MDIR;
	closedir MDIR ;

	return @files;

}



# 	getFileExtension($fileName)
# 		Splits the file by the '.' char and then if the length
# 		of the Array is zero return zero otherwise return
# 		the last index of the array, or $#array.

sub getFileExtension {

	(my $fileName) = @_;	
	my @spaces = split( /\./, $fileName );
	
	if( scalar(@spaces) == 0 ) {
		return '';
	} else {
		return $spaces[$#spaces];
	}

}


# 	isRelativeDirectory($pathName)
# 		This returns true if the value equals one of these:
# 		['.', '..']

sub isRelativeDirectory {
	
	my ($pathName) = @_;
	
	if($pathName eq '.' || $pathName eq '..'){
		return true;
	}
	
	return false;
	
}
