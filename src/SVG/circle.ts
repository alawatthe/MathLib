// ### SVG circle
// Draws a circle on the screen.
//
// *@param {circle}* The circle to be drawn  
// *@param {object}* [options] Optional drawing options  
// *@returns {screen}* Returns the screen
circle: function (circle, options = {}, redraw = false) {
	var screen = this.screen,
			prop, opts,
			svgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

	svgCircle.setAttribute('cx', circle.center[0]);
	svgCircle.setAttribute('cy', circle.center[1]);
	svgCircle.setAttribute('r', circle.radius);

	if (options) {
		svgCircle.setAttribute('stroke-width', ((<any>options).lineWidth || 4 )/(screen.scale.x - screen.scale.y) + '');
		opts = MathLib.SVG.convertOptions(options);
		for (prop in opts) {
			if (opts.hasOwnProperty(prop)) {
				svgCircle.setAttribute(prop, opts[prop]);
			}
		}
	}

	this.ctx.appendChild(svgCircle)

	if (!redraw) {
		this.stack.push({
			type: 'circle',
			object: circle,
			options: options
		});
	}

	return this;
},