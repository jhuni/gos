#!/usr/bin/perl

use strict;
use warnings;
use boolean;

mkdir "./pod";


=pod

=head2 main()

This subroutine is what the program essentially does on
startup. This subroutine goes through the directories
and gets POD documentation in JavaScript and returns
the POD documentation changed into .pod files after
having had picked out all of said files. This
uses a recursive algorithm to scan the filesystem.

=cut

(sub {

mkdir "./pod";
processPodDirectory('./pod/', '../apps/');

})->();


=pod

=head2 processPodDirectory($outputDir, $basePath, $relativePath)

This accepts two values $basePath and $relativePath, $relativePath = '.' unless
it is defined. The value $basePath is from where to search from and the
value $relativePath is appended to $basePath and it is the basis for
the newly created pod files, these new pod files are relative to the
current directory.

=cut

sub processPodDirectory {

	(my $outputDir, my $basePath, my $relativePath) = @_;
	$relativePath = './' unless defined $relativePath;

	my @files = getFilesFromDirectory($basePath . $relativePath);
	
	for my $i (@files) {
	
		my $filePath = $basePath . $relativePath . $i;
		
		if ( -d ($filePath) and !isRelativeDirectory($i) ) {
			
			# This is if there is another directory to go through
			my $newDirectory = $relativePath . $i . '/';
			mkdir ($outputDir . $newDirectory);
			processPodDirectory($outputDir, $basePath, $newDirectory);
			
		} elsif ( getFileExtension($i) eq 'js' ) {
			
			# Setup the output pod data. Take off the .js extension and put .pod instead.
			my $podFilePath = ('>' . $outputDir . $relativePath . stripFileExtension($i) . '.pod');
			my $pod = getPodFromFilePath($filePath);
			
			open  MFILE, $podFilePath or die $!;
			print MFILE  $pod;
			close MFILE;
			
		}

	}
	
}



=pod

=head2 isRelativeDirectory($pathName)

This returns true if the value equals one of these:
['.', '..']

=cut

sub isRelativeDirectory {
	
	my ($pathName) = @_;
	
	if($pathName eq '.' || $pathName eq '..'){
		return true;
	}
	
	return false;
	
}



=pod

=head2 getFilesFromDirectory($directoryPath)

This is a simple subroutine to make it simpler to get
the files from a directory. This handles the directory reading issues for you.

=cut

sub getFilesFromDirectory {

	(my $directoryPath) = @_;

	opendir MDIR, $directoryPath;
	my @files = readdir MDIR;
	closedir MDIR ;

	return @files;

}



=pod

=head2 getPodFromFilePath($path)

This does the work of getting the pod from the lines
for you by going to a file and getting its
lines and passing it to the other function.

=cut

sub getPodFromFilePath {
	
	(my $path) = @_;
	
	open MFILE, '<' . $path or die $!;
	my @lines = <MFILE>;
	close MFILE;
	
	return getPodFromLines(@lines);
	
}


=pod

=head2 getFileExtension($fileName)

Splits the file by the '.' char and then if the length
of the Array is zero return zero otherwise return
the last index of the array, or $#array.

=cut

sub getFileExtension {

	(my $fileName) = @_;	
	my @spaces = split( /\./, $fileName );
	
	if( scalar(@spaces) == 0 ) {
		return 0;
	} else {
		return $spaces[$#spaces];
	}

}

=pod

=head2 stripFileExtension($fileName)

This is similar to getFileExtension except instead this
returns the fileName except with the extension gone from
its value, essentially it is the oppposite of getFileExtension,
instead of getting it you are removing it.

=cut

sub stripFileExtension {

	(my $fileName) = @_;
	my @spaces = split( /\./, $fileName);
	
	if( scalar(@spaces) == 0 ) {
		return $fileName;	
	} else {
		pop(@spaces);
		return join('.', @spaces);	
	}
	
}


=pod

=head2 getPodFromLines(@lines)

This essentially takes a single array and goes through it by checking if it
has found a comment yet, else it sees if this is the start of one. The it
checks if it is pod yet and then checks if this is the start of one.

If it is pod then start copying the pod into the $pod variable. Return
the $pod variable at the end.

=cut

sub getPodFromLines {

	my @lines = @_;   # The arguments
	my $pod = '';     # The value I return

	# Some booleans that I use:
	my $isComment = false;
	my $isPod = false;

	# Initialize Loop values:
	my $i;
	my $length = scalar(@lines);

	for( $i = 0; $i < $length; $i++ ) {

		my $line = $lines[$i];

		# Check if this is now the end of the comments:
		if( $line =~ m/\s*\*\// ) {
			$isPod = false;
			$isComment = false;
			next;
		}

		if ( $isComment ) {

			if ( $isPod ) {

				$pod .= $line;
				
			} else {

				# Check if it is the start of some pod:
				if( $line =~ m/\s*=/ ) {
					$isPod = true;
					$pod .= $line;
				}	

			}		

		} else {

			# Check if it is the start of a comment:
			if( $line =~ m/\s*\/\*/ ) {
				$isComment = true;
			}

		}

	}

	return $pod;

}


