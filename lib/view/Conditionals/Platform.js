CKIT.Utils.Base.assign('Conditionals.Platform', {
	
	hasCanvas: typeof CanvasRenderingContext2D != "undefined",
	
	hasVML: false,
	
	hasSVG: false,
	
	hasSilverlight: (function() {
		try {
			new ActiveXObject('AgControl.AgControl');
			return true;
		} catch(e) {
			return false;
		}
	})(),
	
	hasFlash: false,
	
	
	isIE: /*@cc_on!@*/false
	
});
