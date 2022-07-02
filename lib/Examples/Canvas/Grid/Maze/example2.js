JSAN.use('Grid.Maze.Solver');
JSAN.use('Canvas.Grid.Maze');

var run = function(parent) {

	var pos = new Array();
	pos[0] = "00000000";
	pos[1] = "01000010";
	pos[2] = "01000010";
	pos[3] = "01000010";
	pos[4] = "01000010";
	pos[5] = "01000010";
	pos[6] = "01111110";
	pos[7] = "00000000";
	
	var mymaze = new Canvas.Grid.Maze(pos);
	
	var size = 700;
	parent.innerHTML += '<canvas id="canvas" width="' + size + '" height="' + size + '"></canvas>';
	mymaze.draw(size);

}
