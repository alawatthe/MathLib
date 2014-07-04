/**
 * Draws a circle on the screen.
 *
 * @param {Circle} circle The circle to be drawn  
 * @param {drawingOptions} options Optional drawing options
 * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
 * @return {Screen} Returns the screen
 */
circle: function (circle : Circle, options : drawingOptions = {}, redraw = false) : Screen2D {
	var screen = this.screen,
			ctx = this.ctx,
			prop, opts;

	ctx.save();
	ctx.lineWidth = (options.lineWidth || 4) / (screen.scale.x - screen.scale.y);

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

	// Draw the circle
	ctx.beginPath();
	ctx.arc(circle.center[0], circle.center[1], circle.radius, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.restore();

	if (!redraw) {
		this.stack.push({
			type: 'circle',
			object: circle,
			options: options
		});
	}

	return this;
},