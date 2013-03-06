// ### Point.prototype.draw()
// Draws the point on a canvas or svg element.
//
// *@param {MathLib.screen object}* screen The screen to draw onto  
// *@param {object}* [options] Drawing options  
// *@returns {point}* The current point
draw(screen, options) {
	if (Array.isArray(screen)) {
		var point = this;
		screen.forEach(function (x) {
			x.point(point, options);
		});
	}
	else {
		screen.point(this, options);
	}

	return this;
}