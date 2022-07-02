JSAN.use('CKIT');
JSAN.use('Grid');
JSAN.use('Grid.Directions');
JSAN.use('YAHOO');
JSAN.use('YAHOO.util.StyleSheet');
JSAN.use('minesweeper._exe');
JSAN.use('minesweeper.controller.main');
JSAN.use('minesweeper.model.minefield');
JSAN.use('minesweeper.model.gamestate');

CKIT.Utils.Base.assign('minesweeper.view.std.structure', (function(){

var pkg = function(name) {
	this.name = name;
};

pkg.prototype = {


encap: function() {
	return( this.name + arguments[0] );
},

minesweeper: function(field) { 
	return('	<div class="minesweeper" id="' + this.encap('') + '">		' + field + '	</div>');
},

options: function() { 
	return('	<button class="face" id="' + this.encap('state') + '"> </button>');
},

field: function(field) { 
	return('	<div class="minefield" id="' + this.encap('field') + '">	' + field + '	</div>');
},

cell: function(row, col, width, height) { 
	return('	<button class="cell nl" id="' + this.encap('' + row + ',' + col + '') + '" style="width: ' + width + '; height: ' + height + ';">	</button>');
},

clearer: function() { 
	return('	<span class="clearer">	</span>');
}
}; // End Prototype

return pkg;
})()  );

(new YAHOO.util.StyleSheet('.minesweeper{text-align:center;}.minesweeper .cell{text-align:center;display:block;float:left;margin:0px;padding:0px;font-weight:bold;font-size:100%;}.minesweeper .nl{background-color:Highlight;}.minesweeper .focused{border:1px dotted #880088;}.minesweeper .vlone{color:blue;}.minesweeper .vltwo{color:green;}.minesweeper .vlthree{color:red;}.minesweeper .vlfour{color:#0000aa;}.minesweeper .vlfive{color:#aa0000;}.minesweeper .vlsix{color:#00ffff;}.minesweeper .vlseven{color:black;}.minesweeper .vleight{color:black;}.minesweeper .face{width:32px;height:32px;background-color:white;}.minesweeper .clearer{display:block;clear:left;}')).enable();