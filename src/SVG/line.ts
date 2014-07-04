/**
 * Draws a line on the screen.
 *
 * @param {Line} line The line to be drawn  
 * @param {drawingOptions} options Optional drawing options
 * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
 * @return {Canvas} Returns the screen
 */
line: function (line, options : drawingOptions = {}, redraw = false) : Screen2D {
	var screen = this.screen,
			points,
			prop, opts,
			svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');

	// Don't try to draw the line at infinity
	if (line.type === 'line' && MathLib.isZero(line[0]) && MathLib.isZero(line[1])) {
		return this;
	}
	else {
		points = this.screen.getLineEndPoints(line);
	}

	svgLine.setAttribute('x1', points[0][0]);
	svgLine.setAttribute('y1', points[0][1]);
	svgLine.setAttribute('x2', points[1][0]);
	svgLine.setAttribute('y2', points[1][1]);

	if (options) {
		svgLine.setAttribute('stroke-width', (options.lineWidth || 4 ) / (screen.scale.x - screen.scale.y) + '');
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