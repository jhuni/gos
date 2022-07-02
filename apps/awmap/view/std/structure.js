
CKIT.Utils.Base.assign('awmap.view.std.structure', (function(){

var pkg = function(name) {
	this.name = name;
};

pkg.prototype = {


encap: function() {
	return( this.name + arguments[0] );
},

ribbon: function() { 
	return('	<div id="' + this.encap('ribbon') + '" class="yui-navset">	    <ul class="yui-nav">		<li class="selected"><a href="#tab1"><em>Home</em></a></li>		<li><a href="#tab2"><em>Terrain</em></a></li>		<li><a href="#tab3"><em>Units</em></a></li>	    </ul>            	    <div class="yui-content">		<div id="' + this.encap('hometab') + '">			<button>Horizontal Reverse</button>			<button>Vertical Reverse</button>			<button id="' + this.encap('savecom') + '">Save</button>			<button id="' + this.encap('exportcom') + '">Export</button>		</div>				<div id="' + this.encap('terraintab') + '">				</div>				<div id="' + this.encap('unitstab') + '">			<select id="' + this.encap('unitselector') + '">				<option>Orange Star</option>				<option>Blue Moon</option>				<option>Green Earth</option>				<option>Yellow Comet</option>				<option>Black Hole</option>				<option>Red Fire</option>				<option>Grey Sky</option>				<option>Brown Desert</option>				<option>Amber Blaze</option>				<option>Jade Sun</option>				<option>Colbalt Ice</option>				<option>Pink Cosmos</option>				<option>Teal Galaxy</option>				<option>Purple Lightning</option>			</select>			<div id="' + this.encap('unitnav') + '">			</div>		</div>	    </div>	</div>	');
}
}; // End Prototype

return pkg;
})()  );

