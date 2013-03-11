// ### Line.prototype.draw()
// Draws the line on one or more screens
//
// *@param {screen}* The screen to draw onto.  
// *@param {object}* [options] Drawing options  
// *@returns {boolean}*
draw(screen, options) {
	if (Array.isArray(screen)) {
		var line = this;
		screen.forEach(function (x) {
			x.line(line, options);
		});
	}
	else {
		screen.line(this, options);
	}
	return this;
}