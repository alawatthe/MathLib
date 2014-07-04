/**
 * Draws a line on the screen.
 *
 * @param {Line} line The line to be drawn  
 * @param {drawingOptions} options Optional drawing options  
 * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
 * @return {Screen} Returns the screen
 */
line: function (line, options : drawingOptions = {}, redraw = false) : Screen2D {
	var screen = this.screen,
			points,
			ctx = this.ctx,
			prop, opts;

	ctx.save();
	ctx.lineWidth = (options.lineWidth || 4) / (screen.scale.x - screen.scale.y);

	// Don't try to draw the line at infinity
	if (line.type === 'line' && MathLib.isZero(line[0]) && MathLib.isZero(line[1])) {
		return this;
	}
	else {
		points = this.screen.getLineEndPoints(line);
	}

	// Set the drawing options
	if (options) {
		opts = MathLib.Canvas.convertOptions(options);
		for (prop in opts) {
			if (opts.hasOwnProperty(prop)) {
				ctx[prop] = opts[prop];
			}
		}

		if ('setLineDash' in ctx) {
			ctx.setLineDash(('dash' in options ? options.dash : []));
		}
		if ('lineDashOffset' in ctx) {
			ctx.lineDashOffset = ('dashOffset' in options ? options.dashOffset : 0);
		}
	}


	// Draw the line
	ctx.beginPath();
	ctx.moveTo(points[0][0], points[0][1]);
	ctx.lineTo(points[1][0], points[1][1]);
	ctx.stroke();
	ctx.closePath();
	ctx.restore();

	if (!redraw) {
		this.stack.push({
			type: 'line',
			object: line,
			options: options
		});
	}

	return this;
},