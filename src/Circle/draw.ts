// ### [Circle.prototype.draw()](http://mathlib.de/en/docs/Circle/draw)
// Draw the circle onto the screen.
//
// *@param {Screen}* The screen to draw onto.  
// *@param {object}* Optional drawing options  
// *@return {Circle}* Returns the circle for chaining
draw(screen, options) {
	if (Array.isArray(screen)) {
		var circle = this;
		screen.forEach(function (x) {
			x.circle(circle, options);
		});
	}
	else {
		screen.circle(this, options);
	}
	return this;
}