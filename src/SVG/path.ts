/**
 * Draws a path on the screen.
 *
 * @param {any} curve The path to be drawn  
 * @param {pathDrawingOptions} options Optional drawing options  
 * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
 * @return {Screen} Returns the screen
 */
path: function (curve, options : pathDrawingOptions = {}, redraw = false) : Screen2D {
	var screen = this.screen,
			svgPathStroke = document.createElementNS('http://www.w3.org/2000/svg', 'path'),
			svgPathFill = document.createElementNS('http://www.w3.org/2000/svg', 'path'),
			step = 2 / (screen.scale.x - screen.scale.y),
			pathStringFill, pathStringStroke, from, to, prop, opts, x, y, i, path, paths = [], fx, fxold;

	// If curve is a function f, the path will be (x, f(x))
	if (typeof curve === 'function') {
		path = [];
		from = ('from' in options ? options.from :         - screen.translation.x  / screen.scale.x) - step;
		to = ('to' in options ? options.to : (screen.width - screen.translation.x) / screen.scale.x) + step;
		for (i = from; i <= to; i += step) {
			fx = curve(i);
			
			// Inline NaN test and disontinuity test
			// For more info see the corresponding function for canvas
			if (fx !== fx ||
				(MathLib.abs((fxold - fx) / step) >= 1e2 &&
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
		from = ('from' in options ? options.from : 0) - step;
		to = ('to' in options ? options.to : 2 * Math.PI) + step;
		for (i = from; i <= to; i += step) {
			path.push([x(i), y(i)]);
		}
		paths.push(path);
	}
	else {
		path = curve;
	}


	pathStringFill = 'M' + from + ' 0 ' + paths.reduce(function (previ, path) {
		return previ +
		// Bring the fill down to the zero line at the beginning of a subpath
		' L ' + path[0][0] + ' 0 ' +
		// The "normal" path
		path.reduce(function (prev, cur) {
			return prev + ' L ' + cur.join(' ');
		}, '') +
		// Move the fill back to the zero line at the end of a subpath
		' L ' + path[path.length - 1][0] + ' 0 ';
	}, '');
	
	pathStringStroke = paths.reduce(function (previ, path) {
		return previ + ' M ' + path[0].join(' ') + path.reduce(function (prev, cur) {
			return prev + ' L ' + cur.join(' ');
		}, '');
	}, '');
	

	if (pathStringFill !== '') {
		svgPathFill.setAttribute('d', pathStringFill);
	}
	if (pathStringStroke) {
		svgPathStroke.setAttribute('d', pathStringStroke);
	}

	svgPathStroke.setAttribute('stroke-width', (options.lineWidth || 4 ) / (screen.scale.x - screen.scale.y) + '');


	if (options) {
		opts = MathLib.SVG.convertOptions(options);
		for (prop in opts) {
			if (opts.hasOwnProperty(prop)) {
				svgPathFill.setAttribute(prop, opts[prop]);
				svgPathStroke.setAttribute(prop, opts[prop]);
			}
		}
	}
	
	svgPathFill.setAttribute('stroke', 'transparent');
	svgPathStroke.setAttribute('fill', 'transparent');

	this.ctx.appendChild(svgPathFill);
	this.ctx.appendChild(svgPathStroke);

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