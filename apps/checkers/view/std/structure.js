
CKIT.Utils.Base.assign('checkers.view.std.structure', (function(){

var pkg = function(name) {
	this.name = name;
};

pkg.prototype = {


encap: function() {
	return( this.name + arguments[0] );
},

checkers: function(innerHTML) { 
	return('		<div class="checkers" id="' + this.encap('') + '">		' + innerHTML + '	</div>	');
},

board: function(innerHTML) { 
	return('	<div class="board" id="' + this.encap('board') + '">		' + innerHTML + '	</div>');
},

cell: function(identifier, width, height, myclass) { 
	return('	<div id="' + this.encap('' + identifier + '') + '" class="' + myclass + '" style="width: ' + width + '; height: ' + height + ';">	</div>');
},

clearer: function() { 
	return('	<div class="clearer">	</div>');
}
}; // End Prototype

return pkg;
})()  );

(new YAHOO.util.StyleSheet('.checkers{}.checkers .board{}.checkers .cellp1{border:1px solid #000000;float:left;background-color:white;}.checkers .cellp2{border:1px solid #000000;float:left;background-color:#eeaa77;}.checkers .cellactive{border:1px solid #000000;float:left;background-color:#115588;}.checkers .clearer{clear:left;display:block;width:0px;height:0px;}.checkers .focused{border:1px solid #000000;float:left;background-color:#880088;}')).enable();