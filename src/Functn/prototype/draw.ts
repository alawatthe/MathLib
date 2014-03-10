/**
 * Draws the function on the screen
 *
 * @param {Screen} screen The screen to draw the function onto.  
 * @param {object} options Optional drawing options.  
 * @return {Functn}
 */
functnPrototype.draw = function (screen, options : any = {}) : number {
	var functn = this;
	if (Array.isArray(screen)) {
		screen.forEach(function (x) {
			x.path(functn, options);
		});
	}
	else {
		screen.path(functn, options);
	}

	return this;
};