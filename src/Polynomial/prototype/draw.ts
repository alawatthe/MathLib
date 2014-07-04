/**
 * Draws the polynomial on the screen
 *
 * @param {Screen} screen The screen to draw the polynomial onto.
 * @param {object} options Optional drawing options.
 * @return {Polynomial} Returns the polynomial for chaining
 */
draw(screen, options : pathDrawingOptions = {}) : Polynomial {
	return (<any>this.toFunctn()).draw(screen, options);
}