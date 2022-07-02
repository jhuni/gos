
JSAN.use('Grid.MultiplicationTable');
JSAN.use('Conditionals.Numeric');

var run = function(parent) {
	
	var c = new Conditionals.Numeric();
	var mytable;
	var gm = Grid.MultiplicationTable;

	parent.innerHTML += "<h1>Multiples of Five:</h1>";
	mytable = new gm(12, 12, "red", c.isMod(5));
	mytable.create(parent);

	parent.innerHTML += "<h1>The Fibonanci Sequence</h1>";
	mytable = new gm(12, 12, "red", c.isFibonanci());
	mytable.create(parent);
		
	parent.innerHTML += "<h1>Cube Numbers</h1>";
	mytable = new gm(12, 12, "red", c.isPower(3));
	mytable.create(parent);

	parent.innerHTML += "<h1>Incrementary Sequence</h1>";
	mytable = new gm(12, 12, "red", c.isAdditive(3));
	mytable.create(parent);

}
