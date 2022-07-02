alert("Lang.Random is deprecated!");

JSAN.use('MochiKit.Base');
JSAN.use('MochiKit.Iter');

CKIT.Utils.Base.assign('Lang.Random', {
	
	random: Math.random,
	
	choice: function(array) {
		return( array[ this.randint(0, array.length-1) ]  );
	},
	
	randint: function(minimum, maximum) {
		return( Math.floor( this.random() * (maximum+1) ) + minimum );
	},
	
	getRandomIndexes: function(maxvalue,amount) {

		var mki = MochiKit.Iter;
		var openIndexes = mki.list(  mki.range(0,maxvalue,1)  );
		var randomIndexes = [];
		
		for( var i = 0; i < amount; i++ ) {
			var randomIndex = openIndexes[this.randint(0, openIndexes.length-1)];
			openIndexes.splice( randomIndex, 1);
			randomIndexes.push( randomIndex );
		}
		
		return randomIndexes;

	}
	
});



/*

=head1 NAME

Lang.Random - Generate psuedo-random numbers

=head1 DESCRIPTION

This module is inspired by the Python random
module and as such it uses similar naming conventions
such as choice(array) which returns a random value from the array.

=head1 METHODS

=head2 choice(array)

=head2 randrange(start,stop,step)

=head1 AUTHOR

Jhuni, <jhuni_x@yahoo.com>

=head1 COPYRIGHT

GNU General Public License

*/
