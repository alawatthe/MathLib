// ### Circle.prototype.draw()
// Draw the circle onto the screen.
//
// *@param {screen}* The screen to draw onto.  
// *@param {options}* Optional drawing options  
// *@return {circle}* Returns the circle for chaining
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