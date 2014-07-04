/**
 * Draws a point on the screen.
 *
 * @param {Point} point The point to be drawn
 * @param {drawingOptions} options Optional drawing options
 * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
 * @return {Screen} Returns the screen
 */
point: function (point : Point, options : drawingOptions = {}, redraw = false) : Screen2D {
	var screen = this.screen,
			ctx = this.ctx,
			prop, opts, dist;

	ctx.save();
	ctx.lineWidth = (options.lineWidth || 4) / (screen.scale.x - screen.scale.y);

	// Set the drawing options
	if (options) {
		opts = MathLib.Canvas.convertOptions(options);

		if (!('fillColor' in options) && !('color' in options)) {
			opts.fillStyle = 'black';
		}

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


	// Draw the point
	ctx.beginPath();
	ctx.arc(point[0] / point[2], point[1] / point[2],
		((<any>options).size || 10) / (screen.scale.x - screen.scale.y), 0, 2 * Math.PI);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.restore();


	if ((<any>options).label) {
		dist = 1.75 * ((<any>options).size || 10) + 0.75 * (options.lineWidth || 4);
		screen.text((<any>options).label,
			point[0] / point[2] + dist / (screen.scale.x - screen.scale.y),
			point[1] / point[2] + dist / (screen.scale.x - screen.scale.y), options, true);
	}


	if (!redraw) {
		this.stack.push({
			type: 'point',
			object: point,
			options: options
		});
	}

	return this;
},