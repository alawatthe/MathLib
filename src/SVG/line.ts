// ### SVG line
// Draws a line on the screen.
//
// *@param {line}* The line to be drawn  
// *@param {object}* [options] Optional drawing options  
// *@returns {canvas}* Returns the screen
line: function (line, options = {}, redraw = false) {
	var screen = this.screen,
			points = this.screen.getLineEndPoints(line),
			prop, opts,
			svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');

	svgLine.setAttribute('x1', points[0][0]);
	svgLine.setAttribute('y1', points[0][1]);
	svgLine.setAttribute('x2', points[1][0]);
	svgLine.setAttribute('y2', points[1][1]);

	if (options) {
		svgLine.setAttribute('stroke-width', ((<any>options).lineWidth || 4 )/(screen.scale.x - screen.scale.y) + '');
		opts = MathLib.SVG.convertOptions(options);
		for (prop in opts) {
			if (opts.hasOwnProperty(prop)) {
				svgLine.setAttribute(prop, opts[prop]);
			}
		}
	}

	this.ctx.appendChild(svgLine);
	
	if (!redraw) {
		this.stack.push({
			type: 'line',
			object: line,
			options: options
		});
	}

	return this;
},