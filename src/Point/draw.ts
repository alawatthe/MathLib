/**
 * Draws the point on a canvas or svg element.
 *
 * @param {Screen} screen The screen to draw onto  
 * @param {object} options Drawing options  
 * @return {Point} The current point
 */
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