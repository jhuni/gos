CKIT.Utils.Base.assign('awmap.model.analyzer.analyze', function(map) {
	
	var list = map.terrain; 
	var count = 0;
	var elems = list.elems;
	
	for( var i = 0, l = Math.floor(elems/2); i < l; i++ ) {
		
		if( list.getIndex(i) == list.getIndex(elems-1-i) ) {
			count++;
		}
		
	}
	
	alert( (count/l*100) + "%");
	
	
});

