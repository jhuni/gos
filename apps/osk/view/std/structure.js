
CKIT.Utils.Base.assign('osk.view.std.structure', (function(){

var pkg = function(name) {
	this.name = name;
};

pkg.prototype = {


encap: function() {
	return( this.name + arguments[0] );
},

keyboard: function() { 
	return('	<input id="' + this.encap('input') + '" />	<table cellspacing="0" border="0">		<tr>		<td sz="4">Esc</td> <td sz="2">F1</td> <td sz="2">F2</td> <td sz="2">F3</td> <td sz="2">F4</td> <td sz="2">F5</td> <td sz="2">F6</td> <td sz="2">F7</td> <td sz="2">F8</td> <td sz="2">F9</td><td sz="3">F10</td> <td sz="3">F10</td> <td sz="3">F11</td> <td sz="3">F12</td><td sz="8">F Lock</td>		</tr>		</table>	<table cellspacing="0" border="0">		<tr>				<td sz="3">~</td> 		<td sz="3">1</td> <td sz="3">2</td> <td sz="3">3</td> <td sz="3">4</td> <td sz="3">5</td> <td sz="3">6</td> <td sz="3">7</td> <td sz="3">8</td> <td sz="3">9</td> <td sz="2">0</td>				<td sz="2">-</td> <td sz="2">=</td> <td sz="6">Bksp</td>		</tr>			</table>	<table cellspacing="0" border="0">		<tr>		<td sz="4">Tab</td> 		<td sz="3">q</td> <td sz="3">w</td> <td sz="3">e</td> <td sz="3">r</td> <td sz="3">t</td> <td sz="3">y</td> <td sz="3">u</td> <td sz="3">i</td> <td sz="3">o</td> <td sz="3">p</td> 		<td sz="2">[</td> <td sz="2">[</td> <td sz="2">]</td> <td sz="2">\\</td>		</tr>	</table>	<table cellspacing="0" border="0">		<tr>		<td sz="5">Caps</td> 		<td sz="3">a</td> <td sz="3">s</td> <td sz="3">d</td> <td sz="3">f</td> <td sz="3">g</td> <td sz="3">h</td> <td sz="3">j</td> <td sz="3">k</td> <td sz="3">l</td> 		<td sz="2">;</td> <td sz="2">\'</td> <td sz="6">Enter</td>		</tr>		</table>	<table cellspacing="0" border="0">		<tr>				<td sz="6">Shift</td> 		<td sz="3">z</td> <td sz="3">x</td> <td sz="3">c</td> <td sz="3">v</td> <td sz="3">b</td> <td sz="3">n</td> <td sz="3">m</td> 		<td sz="3">,</td> <td sz="3">.</td> <td sz="3">/</td> <td sz="6">Shift</td>		</tr>	</table>	<table cellspacing="0" border="0">		<tr>		<td sz="5">Crtl</td> <td sz="5">Super</td> <td sz="4">Alt</td> 		<td sz="13"> </td> 		<td sz="5">Alt</td> <td sz="5">Menu</td> <td sz="5">Crtl</td>		</tr>		</table>');
}
}; // End Prototype

return pkg;
})()  );

(new YAHOO.util.StyleSheet('.osk table{border:1px solid #000000;empty-cells:show;}.osk table td{background-color:#EEEEEE;color:black;font-family:monospace;font-size:12px;text-align:center;border-left:1px solid #000000;}.osk table .blank{background-color:white;border:0px #000000;}.osk table .selected{background-color:black;color:white;}.osk table .spacebar{background-color:#DDDDDD;color:#DDDDDD;}')).enable();