
CKIT.Utils.Base.assign('sudoko.view.std.structure', (function(){

var pkg = function(name) {
	this.name = name;
};

pkg.prototype = {


encap: function() {
	return( this.name + arguments[0] );
},

sudoko: function(field) { 
	return('	<div class="sudoko" id="' + this.encap('') + '">		' + field + '	</div>');
},

position: function(field) { 
	return('	<div class="positon" id="' + this.encap('position') + '">' + field + '</div> ');
},

block: function(field, width) { 
	return('	<div class="block" style="width: ' + width + ';">' + field + '</div>');
},

cell: function(id, width, height) { 
	return('	<div class="cell" id="' + this.encap('' + id + '') + '" style="width: ' + width + '; height: ' + height + ';">	</div>');
},

clearer: function() { 
	return('	<div class="clearer">	</div>');
}
}; // End Prototype

return pkg;
})()  );

(new YAHOO.util.StyleSheet('.sudoko .cell{border:1px solid #000000;float:left;font-size:30px;text-align:center;}.clearer{clear:left;}.block{border:4px groove #000000;float:left;}')).enable();