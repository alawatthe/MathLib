// ### Canvas.path
// Draws a path on the screen.
//
// *@param {Path}* The path to be drawn  
// *@param {object}* [options] Optional drawing options  
// *@return {Screen}* Returns the scren
path: function (curve, options = {}, redraw = false) {
	var screen = this.screen,
			ctx = this.ctx,
			prop, opts, path, x, y, i,
			step = 2 / (screen.scale.x - screen.scale.y),
			from, to;


	from = ('from' in options ? (<any>options).from : ( - screen.translation.x) / screen.scale.x) - step;
	to = ('to' in options ? (<any>options).to : (screen.width  - screen.translation.x) / screen.scale.x) + step;

	ctx.save()
	ctx.lineWidth = ((<any>options).lineWidth || 4) / (screen.scale.x - screen.scale.y);


	// Set the drawing options
	if (options) {
		opts = MathLib.Canvas.convertOptions(options);
		for (prop in opts) {
			if (opts.hasOwnProperty(prop)) {
				ctx[prop] = opts[prop];
			}
		}

		if ('setLineDash' in ctx) {
			ctx.setLineDash(('dash' in options ? (<any>options).dash : []));
		}
		if ('lineDashOffset' in ctx) {
			ctx.lineDashOffset = ('dashOffset' in options ? (<any>options).dashOffset : 0);
		}
	}


	// If curve is a function f, the path will be (x, f(x))
	if (typeof curve === 'function') {
		path = [];
		for (i = from; i <= to; i += step) {
			path.push([i, curve(i)]);
		}
	}


	// If curve is an array of two functions [f, g], the path will be (f(x), g(x))
	else if (typeof curve[0] === 'function') {
		path = [];
		x = curve[0];
		y = curve[1];
		for (i = from; i <= to; i += step) {
			path.push([x(i), y(i)]);
		}
	}
	else {
		path = curve;
	}


	// Draw the path
	ctx.beginPath();
	ctx.moveTo(path[0][0], path[0][1]);
	path.forEach(function (x) {
		ctx.lineTo(x[0], x[1]);
	});
	ctx.stroke();
	ctx.closePath();
	ctx.restore();


	if (!redraw) {
		this.stack.push({
			type: 'path',
			object: curve,
			options: options
		});
	}

	return this;
},