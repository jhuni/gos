// JavaScript Dependencies:
JSAN.use('YAHOO');
JSAN.use('YAHOO.util.Dom');
JSAN.use('YAHOO.util.Event');
JSAN.use('YAHOO.util.StyleSheet');
JSAN.use('YAHOO.widget.Treeview');

// CSS Depdencies:
(new YAHOO.util.StyleSheet('.ygtvitem{}.ygtvitem table{margin-bottom:0;border:none;}.ygtvrow td{border:none;padding:0;}.ygtvrow td a{text-decoration:none;}.ygtvtn{width:18px;height:22px;background:url(treeview-sprite.gif) 0 -5600px no-repeat;}.ygtvtm{width:18px;height:22px;cursor:pointer;background:url(treeview-sprite.gif) 0 -4000px no-repeat;}.ygtvtmh,.ygtvtmhh{width:18px;height:22px;cursor:pointer;background:url(treeview-sprite.gif) 0 -4800px no-repeat;}.ygtvtp{width:18px;height:22px;cursor:pointer;background:url(treeview-sprite.gif) 0 -6400px no-repeat;}.ygtvtph,.ygtvtphh{width:18px;height:22px;cursor:pointer;background:url(treeview-sprite.gif) 0 -7200px no-repeat;}.ygtvln{width:18px;height:22px;background:url(treeview-sprite.gif) 0 -1600px no-repeat;}.ygtvlm{width:18px;height:22px;cursor:pointer;background:url(treeview-sprite.gif) 0 0px no-repeat;}.ygtvlmh,.ygtvlmhh{width:18px;height:22px;cursor:pointer;background:url(treeview-sprite.gif) 0 -800px no-repeat;}.ygtvlp{width:18px;height:22px;cursor:pointer;background:url(treeview-sprite.gif) 0 -2400px no-repeat;}.ygtvlph,.ygtvlphh{width:18px;height:22px;cursor:pointer;background:url(treeview-sprite.gif) 0 -3200px no-repeat;}.ygtvloading{width:18px;height:22px;background:url(treeview-loading.gif) 0 0 no-repeat;}.ygtvdepthcell{width:18px;height:22px;background:url(treeview-sprite.gif) 0 -8000px no-repeat;}.ygtvblankdepthcell{width:18px;height:22px;}.ygtvchildren{}* html .ygtvchildren{height:2%;}.ygtvlabel,.ygtvlabel:link,.ygtvlabel:visited,.ygtvlabel:hover{margin-left:2px;text-decoration:none;background-color:white;cursor:pointer;}.ygtvcontent{cursor:default;}.ygtvspacer{height:22px;width:12px;}.ygtvfocus{background-color:#c0e0e0;border:none;}.ygtvfocus .ygtvlabel,.ygtvfocus .ygtvlabel:link,.ygtvfocus .ygtvlabel:visited,.ygtvfocus .ygtvlabel:hover{background-color:#c0e0e0;}.ygtvfocus a,.ygtvrow td a{outline-style:none;}.ygtvok{width:18px;height:22px;background:url(treeview-sprite.gif) 0 -8800px no-repeat;}.ygtvok:hover{background:url(treeview-sprite.gif) 0 -8844px no-repeat;}.ygtvcancel{width:18px;height:22px;background:url(treeview-sprite.gif) 0 -8822px no-repeat;}.ygtvcancel:hover{background:url(treeview-sprite.gif) 0 -8866px no-repeat;}.ygtv-label-editor{background-color:#f2f2f2;border:1px solid silver;position:absolute;display:none;overflow:hidden;margin:auto;z-index:9000;}.ygtv-edit-TextNode{width:190px;}.ygtv-edit-TextNode .ygtvcancel,.ygtv-edit-TextNode .ygtvok{border:none;}.ygtv-edit-TextNode .ygtv-button-container{float:right;}.ygtv-edit-TextNode .ygtv-input input{width:140px;}.ygtv-edit-DateNode .ygtvcancel{border:none;}.ygtv-edit-DateNode .ygtvok{display:none;}.ygtv-edit-DateNode .ygtv-button-container{text-align:right;margin:auto;}')).enable();

// JS:
CKIT.Utils.Base.assign('Widget.TreeView.YAHOO', {
	
	create: function(container, menu, associatedName) {
		
		var analyzeChildren = function(children, currentHierarchy) {
			var rval = [];
			
			for( var i = 0, l = children.length; i<l; i++ ) {
				rval[i] = analyzeTreeElem(children[i], currentHierarchy);
			}
			
			return rval;	
		};
		
		var analyzeTreeElem = function(elem, currentHierarchy) {
			var event = 'window["' + associatedName + '"].menuClick("' + currentHierarchy + elem.text + '")';
			var rval = {type: 'HTML', html: "<div onclick='" + event + "'><img width='30' height='30' src='" +elem.icon+ "'></img>" + elem.text + "</div>"};
		
			if( elem.children ) {
				rval.children = analyzeChildren(elem.children, currentHierarchy+elem.text+"/");
				rval.expanded = true;
			}
		
			return rval;
		};		
		
		var cmenu = [];
		
		for( var i = 0; i < menu.length; i++ ) {
			cmenu[i] = analyzeTreeElem(menu[i], '');
		}	
		
		(new YAHOO.widget.TreeView(container,cmenu)).render();
		
		return true;
		
	}
	
});
