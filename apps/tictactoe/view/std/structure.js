
CKIT.Utils.Base.assign('tictactoe.view.std.structure', (function(){

var pkg = function(name) {
	this.name = name;
};

pkg.prototype = {


encap: function() {
	return( this.name + arguments[0] );
},

myfield: function(field) { 
	return('	<div class="tictactoe" id="' + this.encap('') + '">		' + field + '	</div>');
},

clearer: function() { 
	return('	<span class="clearer">	</span>');
},

cell: function(x, y, width, height, fontSize) { 
	return('	<div class="cell" id="' + this.encap('' + x + ',' + y + '') + '" style="width: ' + width + '; height: ' + height + '; font-size: ' + fontSize + ';">	</div>');
}
}; // End Prototype

return pkg;
})()  );

(new YAHOO.util.StyleSheet('.tictactoe .cell{float:left;text-align:center;border:1px solid #000000;background-color:white;color:black;}.tictactoe .disabled{float:left;text-align:center;border:1px solid #000000;background-color:#cccccc;color:black;}.tictactoe .clearer{clear:left;display:block;width:0px;height:0px;}')).enable();