JSAN.use('Grid.Maze.Solver');
JSAN.use('Canvas.Grid.Maze');

var run = function(parent) {

	parent.innerHTML += '<canvas id="canvas"></canvas>';

	var pos = new Array();
	pos[0] = "0000000001100000000010";
	pos[1] = "0101111101001111011110";
	pos[2] = "0111010001010001000000";
	pos[3] = "0001011111010100111111";
	pos[4] = "0101000000011100001001";
	pos[5] = "0100011111100001000010";
	pos[6] = "0111110000000000111100";
	pos[7] = "0100000100011111000000";
	pos[8] = "0111110101100000001000";
	pos[9] = "0000000000000001110111";
	pos[10] = "0111111111111011000001";
	pos[11] = "0001011111010100111111";
	pos[12] = "0000000000100000000101";
	pos[13] = "0111111110010000001001";
	pos[14] = "0010000011011111100001";
	pos[15] = "0100111010000010000111";
	pos[16] = "0001100000110000100001";

	var size = 500;
	var height = Math.floor((size / pos.length) * pos[0].length);
	document.getElementById('canvas').setAttribute("height", size.toString() );
	document.getElementById('canvas').setAttribute("width", height.toString() );

	var solver = new Grid.Maze.Solver(pos);	

	var mymaze = new Canvas.Grid.Maze(pos, 'rgb(0, 0, 0)', 'rgb(0, 255, 0)');
	mymaze.draw(size);
	mymaze.drawFullPath(solver.path, size);
	
};
