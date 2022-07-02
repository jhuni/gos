JSAN.use('CKIT');
JSAN.use('Lang.Random');
JSAN.use('coord');
JSAN.use('tbsize');
JSAN.use('Grid');
JSAN.use('Grid.Directions');
JSAN.use('Grid.Connections');
JSAN.use('QEvent');
JSAN.use('YAHOO');
JSAN.use('YAHOO.util.StyleSheet');
JSAN.use('colorlines._exe');
JSAN.use('colorlines.view.std.controller');
JSAN.use('colorlines.model.ImageSettings');
JSAN.use('colorlines.controller.main');

CKIT.Utils.Base.assign('colorlines.view.std.structure', (function(){

var pkg = function(name) {
	this.name = name;
};

pkg.prototype = {


encap: function() {
	return( this.name + arguments[0] );
},

mytable: function(field) { 
	return('	<div class="colorlines" id="' + this.encap('table') + '">		' + field + '	</div>');
},

clearer: function() { 
	return('	<span class="clearer">	</span>');
},

cell: function(identifier, width, height, myimg) { 
	return('	<div class="cell" id="' + this.encap('' + identifier + '') + '" style="width: ' + width + '; height: ' + height + '">		' + myimg + '	</div>');
}
}; // End Prototype

return pkg;
})()  );

(new YAHOO.util.StyleSheet('.colorlines .cell{background-color:#ffffff;border:1px solid #000000;float:left;text-align:center;}.colorlines .clearer{display:block;width:0px;height:0px;clear:left;}')).enable();
