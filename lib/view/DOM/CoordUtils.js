/*jsan __header__ */

JSAN.use('CKIT');
JSAN.use('Conditionals.Platform');
JSAN.use('coord');
JSAN.use('tbsize');
JSAN.use('Shape.Rect');

/*jsan __end__ */


CKIT.Utils.Base.assign('DOM.CoordUtils', {});

(function() {

if( Conditionals.Platform.isIE ) {
	coord.getFromPageEvent = function( e ) {
		return new coord(event.clientX+document.body.scrollTop, event.clientY+document.body.scrollTop);
	};
} else {
	coord.getFromPageEvent = function( e ) {
		return new coord(e.pageX, e.pageY);
	};
}

coord.getStylePosition = function( element ) {

	return new coord( parseInt(element.style.left, 10), parseInt(element.style.top, 10) );

};


/* Element Getters: */
coord.getFromPageElement = function( oElement ) {

	var mycoord = new coord(0,0);

	while( oElement !== null ) {

		mycoord.y += oElement.offsetTop;
		mycoord.x += oElement.offsetLeft;

		oElement = oElement.offsetParent;
	}

	return mycoord;
};

tbsize.getFromPageElement = function( oElement ) {
	
	return new tbsize(oElement.offsetWidth, oElement.offsetHeight);
	
};

Shape.Rect.getFromPageElement = function( oElement ) {
	
};


Shape.Rect.fromWindowSize = function() {

	var cd = new coord(0,0);
	var sz = new tbsize(0,0);
	
	if (typeof window.innerWidth !== "undefined" && typeof window.innerHeight !== "undefined") {
		sz.width = window.innerWidth;
		sz.height = window.innerHeight;
	} else {
		sz.width = document.body.clientWidth;
		sz.height = document.body.clientHeight;
	}
	
	return new Shape.Rect(cd,sz);

};


/* Element setters */
coord.prototype.setElementPosition = function( element ) {

	element.style.top = this.y + "px";
	element.style.left = this.x + "px";

};

tbsize.prototype.setElementSize = function( element ) {
	
	element.style.width = this.width;
	element.style.height = this.height;	

};

Shape.Rect.prototype.setElementPosition = function( element ) {
	
	this.coord.setElementPosition(element);
	this.size.setElementSize(element);
	
};




})();
