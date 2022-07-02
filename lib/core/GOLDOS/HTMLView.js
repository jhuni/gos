/*jsan __header__ */

JSAN.use('CKIT');

/*jsan __end__ */

Joose.Class('GOLDOS.HTMLView', {

	constructor: function(name) {
		this.name = name;
	},
	
	has: {
		name: {}
	},
	
	methods: {
		
		createRoot: function() {
		
			var root = document.createElement("div");
			root.setAttribute( "id", this.encap('') );
			return root;
		
		},
		
		redisplay: function() {
			var container = this.get('').parentNode;
			container.removeChild(this.get(''));
			this.display(container);
		},
		
		encap: function() {
			return(   this.name + arguments[0]  );
		},

		decap: function(value) {
			return( value.substr(this.name.length) );
		},

		get: function() {
			return( document.getElementById(this.encap(arguments[0])) );	
		}
		
	}

});

/*

CKIT.Class.assign('GOLDOS.HTMLView', {
	
	Has: ['name'],
	
	createRoot: function() {
		
		var root = document.createElement("div");
		root.setAttribute( "id", this.encap('') );
		return root;
		
	},
	
	redisplay: function() {
		var container = this.get('').parentNode;
		container.removeChild(this.get(''));
		this.display(container);
	},
	
	encap: function() {
		return(   this.name + arguments[0]  );
	},

	decap: function(value) {
		return( value.substr(this.name.length) );
	},

	get: function() {
		return( document.getElementById(this.encap(arguments[0])) );	
	}
	
});

*/
