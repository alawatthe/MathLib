/**
 * Draws a path on the screen.
 *
 * @param {Path} curve The path to be drawn
 * @param {drawingOptions} options Optional drawing options
 * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
 * @return {Screen} Returns the scren
 */
path: function (curve, options : pathDrawingOptions = {}, redraw = false) : Screen2D {
	var screen = this.screen,
			ctx = this.ctx,
			prop, opts, path, paths = [], x, y, i, fx, fxold,
			step = 2 / (screen.scale.x - screen.scale.y),
			from, to;

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


	// If curve is a function f, the path will be (x, f(x))
	if (typeof curve === 'function') {
		path = [];
		from = ('from' in options ? (options).from : ( - screen.translation.x) / screen.scale.x) - step;
		to = ('to' in options ? (options).to : (screen.width  - screen.translation.x) / screen.scale.x) + step;

		for (i = from; i <= to; i += step) {
			fx = curve(i);
			// Inline NaN test and disontinuity test
			// Check if we are drawing a (nearly) vertical line, which should not be there.
			// i.e the vertical lines at π/2 for the tangent function
			// TODO: Find a better check if there is a discontinuity.
			if (fx !== fx ||
				// next the check for very steep lines
				(MathLib.abs((fxold - fx) / step) >= 1e2 &&
				// But those points additionally have to satisfy,
				// that the midpoint of the current interval is not in between
				// the two values of the function at the endpoints of the intervall.
				(fx - curve(i - step / 2)) * (fxold - curve(i - step / 2)) >= 0)) {

				// Don't add empty subpaths
				if (path.length) {
					paths.push(path);
					path = [];
				}
			}
			else {
				path.push([i, fx]);
			}

			fxold = fx;
		}
		if (path.length) {
			paths.push(path);
		}
	}


	// If curve is an array of two functions [f, g], the path will be (f(x), g(x))
	else if (typeof curve[0] === 'function') {
		path = [];
		x = curve[0];
		y = curve[1];
		from = ('from' in options ? (options).from : 0) - step;
		to = ('to' in options ? (options).to : 2 * Math.PI) + step;
		for (i = from; i <= to; i += step) {
			path.push([x(i), y(i)]);
		}
		paths.push(path);
	}
	else {
		path = curve;
	}


	// Draw the path
	// Till now I haven't found a way to stroke and fill the path in one go.
	// The problem is basically, that moveTo creates a new subpath
	// and every subpath is filled on its own.
	if (options.fillColor || options.fillColor !== 'transparent') {
		ctx.beginPath();
		ctx.lineTo(from, 0);
		paths.forEach(function (path) {
			// The following line (and the line four lines afterwards) fixes the fill at holes in the path.
			ctx.lineTo(path[0][0], 0);
			path.forEach(function (x) {
				ctx.lineTo(x[0], x[1]);
			});
			ctx.lineTo(path[path.length - 1][0], 0);
		});
		ctx.fill();
		// ctx.closePath();
	}

	if (options.lineColor || options.lineColor !== 'transparent') {
		ctx.beginPath();
		paths.forEach(function (path) {
			ctx.moveTo(path[0][0], path[0][1]);
			path.forEach(function (x) {
				ctx.lineTo(x[0], x[1]);
			});
		});
		ctx.stroke();
		// ctx.closePath();
	}

	ctx.restore();

	if (!redraw) {
		if (options.conic) {
			this.stack.push({
				type: 'conic',
				object: options.conic,
				options: options
			});
		}
		else {
			this.stack.push({
				type: 'path',
				object: curve,
				options: options
			});
		}
	}

	return this;
},