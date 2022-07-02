CKIT.Class.assign('gnect.model.gamestate', {
	
	Has: ['pos', 'turn'],
	
	toggleTurns: function() {
		this.turn = (this.turn===1) ? 2 : 1;	
	}
	
});
