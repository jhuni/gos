JSAN.use('Animation.Tabular');

var run = function(parent) {
	
	mytable = new Animation.Tabular(5, "25", "35", "#ffffff", "#00ff00", "#ffff00", "mytable");
	mytable.create(parent);
	var to = 0;
	var space = 'mytable';
	to += mytable.animateRadius(space, to, 50, -1);
	to += mytable.animateRadius(space, to, 50, 1);
	to += mytable.animateRadius(space, to, 50, -1);
}

