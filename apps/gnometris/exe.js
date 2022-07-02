JSAN.use('CKIT');
JSAN.use('coord');
JSAN.use('tbsize');
JSAN.use('Grid');
JSAN.use('Grid.Transformations');
JSAN.use('Grid.Rank');
JSAN.use('YAHOO');
JSAN.use('YAHOO.util.StyleSheet');
JSAN.use('gnometris._exe');
JSAN.use('gnometris.controller.main');
JSAN.use('gnometris.model.shapes');
JSAN.use('gnometris.model.gamestate');

CKIT.Utils.Base.assign('gnometris.view.std.structure', (function(){

var pkg = function(name) {
	this.name = name;
};

pkg.prototype = {


encap: function() {
	return( this.name + arguments[0] );
},

gnometris: function(innerHTML) { 
	return('	<div class="gnometris" id="' + this.encap('') + '">		' + innerHTML + '	</div>');
},

sidepanel: function() { 
	return('	<div class="sidepanel">		<div style="float: left;">Score:</div><div id="' + this.encap('score') + '">0</div>		<div style="float: left;">Lines:</div><div id="' + this.encap('lines') + '">0</div>		<div style="float: left;">Level:</div><div id="' + this.encap('level') + '">1</div>	</div>');
},

field: function(identifier, width, height, field) { 
	return('	<div class="field" id="' + this.encap('field') + '" style="width: ' + width + '; height: ' + height + ';">	' + field + '	</div>');
},

block: function(identifier, width, height) { 
	return('	<div class="blank0" id="' + this.encap('' + identifier + '') + '" style="width: ' + width + '; height: ' + height + ';">	</div>');
}
}; // End Prototype

return pkg;
})()  );

(new YAHOO.util.StyleSheet('.gnometris .field{float:left;border:1px solid #000000;background-color:#ffffff;}.gnometris .sidepanel{float:left;width:100px;padding:20px;}.gnometris .field div{float:left;border:1px solid #000000;}.gnometris .blockblank{background-color:white;}.gnometris .block0{background-color:cyan;}.gnometris .block1{background-color:blue;}.gnometris .block2{background-color:orange;}.gnometris .block3{background-color:yellow;}.gnometris .block4{background-color:green;}.gnometris .block5{background-color:purple;}.gnometris .block6{background-color:red;}')).enable();