// ### Functn.prototype.draw()
// Draws the function on the screen
//
// *@param {screen}* The screen to draw the function onto.  
// *@param {object}* [options] Optional drawing options.  
// *@returns {functn}*
MathLib.extendPrototype('functn', 'draw', function(screen, options) {
	var path = [], i;

	for (i = -50; i <= 50; i = Math.round((i + 0.01) * 100) / 100) {
		path.push([i, this(i)]);
	}
	if (Array.isArray(screen)) {
		screen.forEach(function (x) {
			x.path(path, options);
		});
	}
	else {
		screen.path(path, options);
	}

	return this;
});