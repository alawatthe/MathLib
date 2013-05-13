// ### SVG path
// Draws a path on the screen.
//
// *@param {curve}* The path to be drawn  
// *@param {object}* [options] Optional drawing options  
// *@return {Screen}* Returns the screen
path: function (curve, options = {}, redraw = false) {
	var screen = this.screen,
			svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path'),
			step = 2 / (screen.scale.x - screen.scale.y),
			pathString, from, to, prop, opts, x, y, i, path;

	from = ('from' in options ? (<any>options).from :         - screen.translation.x  / screen.scale.x) - step;
	to = ('to' in options ? (<any>options).to : (screen.width - screen.translation.x) / screen.scale.x) + step;


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

	pathString = 'M' + path.reduce(function (prev, cur) {
		return prev + ' L' + cur.join(' ');
	});
	svgPath.setAttribute('d', pathString);

	svgPath.setAttribute('stroke-width', ((<any>options).lineWidth || 4 ) / (screen.scale.x - screen.scale.y) + '');


	if (options) {
		opts = MathLib.SVG.convertOptions(options);
		for (prop in opts) {
			if (opts.hasOwnProperty(prop)) {
				svgPath.setAttribute(prop, opts[prop]);
			}
		}
	}

	this.ctx.appendChild(svgPath);

	if (!redraw) {
		this.stack.push({
			type: 'path',
			object: curve,
			options: options
		});
	}

	return this;
},