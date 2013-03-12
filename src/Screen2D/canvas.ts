var	colorConvert = function (n) {
			if (n === undefined){
				return undefined;
			}
			else if (typeof n === 'string'){
				return n;
			}
			return '#' + ('00000'+n.toString(16)).slice(-6); 
		};




var canvas = {
	normalizeOptions: function (opt) {
		var res:any = {};
		if ('fillColor' in opt) {
			res.fillStyle = opt.fillColor
		}
		else if ('color' in opt) {
			res.fillStyle = opt.color
		}


		if ('font' in opt) {
			res['font-family'] = opt.font
		}

		if ('fontSize' in opt) {
			res['font-size'] = opt.fontSize
		}


		if ('lineColor' in opt) {
			res.strokeStyle = opt.lineColor
		}
		else if ('color' in opt) {
			res.strokeStyle = opt.color
		}

		return res;
	},


	applyTransformation: function () {
		var m = this.transformation;
		this.layer.forEach(function(l){l.ctx.setTransform(m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2])});
	},




	draw: function (x?, options = {}) {
		var _this = this;

		if (arguments.length === 0) {
			this.stack.forEach(function(x,i){
				if (x.type === 'text' ) {
					_this.text(x.object, x.x, x.y, x.options, true);
				}
				if (x.type === 'pixel' ) {
					_this.pixel(x.object, x.t, x.r, x.b, x.l, x.options, true);
				}
				else {
					_this[x.type](x.object, x.options, true);
				}
			});
		}


		else if (x.type === 'circle') {
			this.circle(x, options);
		}
		else if (x.type === 'line') {
			this.line(x, options);
		}
		else if (Array.isArray(x)) {
			x.forEach(function (y) {_this[y.type](y, options);});
		}
	},



	// ### Canvas circle
	// Draws a circle on the screen.
	//
	// *@param {circle}* The circle to be drawn  
	// *@param {object}* [options] Optional drawing options  
	// *@returns {screen}* Returns the screen
	circle: function (circle, options = {}, redraw = false) {
		var screen = this.screen,
				ctx = this.ctx,
				prop, opts;

		ctx.save();
		ctx.lineWidth = ((<any>options).lineWidth || 4)/(screen.scale.x - screen.scale.y);

		// Set the drawing options
		if (options) {
			opts = canvas.normalizeOptions(options);
			for (prop in opts) {
				if (opts.hasOwnProperty(prop)) {
					ctx[prop] = opts[prop];
				}
			}

			if('setLineDash' in ctx) {
				ctx.setLineDash(('dash' in options ? (<any>options).dash : []));
			}
			if ('lineDashOffset' in ctx) {
				ctx.lineDashOffset = ('dashOffset' in options ? (<any>options).dashOffset : 0);
			}
		}



		// Draw the line
		ctx.beginPath();
		ctx.arc(circle.center[0], circle.center[1], circle.radius, 0, 2*Math.PI);
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


	// ### Canvas line
	// Draws a line on the screen.
	//
	// *@param {line}* The line to be drawn  
	// *@param {object}* [options] Optional drawing options  
	// *@returns {screen}* Returns the screen
	line: function (line, options = {}, redraw = false) {
		var screen = this.screen,
				points = this.screen.getLineEndPoints(line),
				ctx = this.ctx,
				prop, opts;

		ctx.save()
		ctx.lineWidth = ((<any>options).lineWidth || 4)/(screen.scale.x - screen.scale.y);


		// Set the drawing options
		if (options) {
			opts = canvas.normalizeOptions(options);
			for (prop in opts) {
				if (opts.hasOwnProperty(prop)) {
					ctx[prop] = opts[prop];
				}
			}

			if('setLineDash' in ctx) {
				ctx.setLineDash(('dash' in options ? (<any>options).dash : []));
			}
			if ('lineDashOffset' in ctx) {
				ctx.lineDashOffset = ('dashOffset' in options ? (<any>options).dashOffset : 0);
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




// ### Canvas path
// Draws a path on the screen.
//
// *@param {path}* The path to be drawn  
// *@param {object}* [options] Optional drawing options  
// *@returns {screen}* Returns the scren
	path: function (curve, options = {}, redraw = false) {
		var screen = this.screen,
				ctx = this.ctx,
				prop, opts, path, x, y, i,
				step = 2/(screen.scale.x - screen.scale.y),
				from, to;


		from = ('from' in options ? (<any>options).from : ( - screen.translation.x) / screen.scale.x)-step;
		to = ('to' in options ? (<any>options).to : (screen.width  - screen.translation.x) / screen.scale.x)+step;

		ctx.save()
		ctx.lineWidth = ((<any>options).lineWidth || 4)/(screen.scale.x - screen.scale.y);


		// Set the drawing options
		if (options) {
			opts = canvas.normalizeOptions(options);
			for (prop in opts) {
				if (opts.hasOwnProperty(prop)) {
					ctx[prop] = opts[prop];
				}
			}

			if('setLineDash' in ctx) {
				ctx.setLineDash(('dash' in options ? (<any>options).dash : []));
			}
			if ('lineDashOffset' in ctx) {
				ctx.lineDashOffset = ('dashOffset' in options ? (<any>options).dashOffset : 0);
			}
		}


		// If curve is a function f, the path will be (x, f(x))
		if (typeof curve === 'function') {
			path = [];
			for (i = from; i <= to; i+=step) {
				path.push([i, curve(i)]);
			}
		}


		// If curve is an array of two functions [f, g], the path will be (f(x), g(x))
		else if (typeof curve[0] === 'function') {
			path = [];
			x = curve[0];
			y = curve[1];
			for (i = from; i <= to; i+=step) {
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





	// ### Canvas pixel
	// Draws pixel on the screen.
	//
	// *@param {path}* The path to be drawn  
	// *@param {object}* [options] Optional drawing options  
	// *@returns {screen}* Returns the screen
	pixel: function (f, t, r, b, l, options = {}, redraw = false) {
		var screen = this.screen,
				top     = (              - screen.translation.y) / screen.scale.y,
				bottom  = (screen.height - screen.translation.y) / screen.scale.y,
				left    = (              - screen.translation.x) / screen.scale.x,
				right   = (screen.width  - screen.translation.x) / screen.scale.x,
				ctx = this.ctx,
				prop, opts, path, x, y, i;

		t = Math.min(top, t);
		r = Math.min(right, r);
		b = Math.max(bottom, b);
		l = Math.max(left, l);


		var tPxl = Math.floor(-t*screen.scale.y),
				rPxl = Math.floor(r*screen.scale.x),
				bPxl = Math.floor(-b*screen.scale.y),
				lPxl = Math.floor(l*screen.scale.x),
				w = (rPxl-lPxl),
				h = (bPxl-tPxl),
				imgData = ctx.createImageData(w, h),
				pxl;


		for (y = tPxl, i = 0; y > bPxl; y--) {
			for (x = lPxl; x < rPxl; x++, i++) {
				pxl = f(x/screen.scale.x, y/screen.scale.y);
				imgData.data[4*i]   = pxl[0];
				imgData.data[4*i+1] = pxl[1];
				imgData.data[4*i+2] = pxl[2];
				imgData.data[4*i+3] = pxl[3];
			}
		}

		ctx.putImageData(imgData, (left-l)*screen.scale.x, (t-top)*screen.scale.y);


		if (!redraw) {
			this.stack.push({
				type: 'pixel',
				object: f,
				t: t,
				r: r,
				b: b,
				l: l,
				options: options
			});
		}

		return this;
	},




	// ### Canvas text
	// Writes text on the screen.
	//
	// *@param {str}* The string to be drawn  
	// *@param {x}* The x coordinate  
	// *@param {y}* The y coordinate  
	// *@param {object}* [options] Optional drawing options  
	// *@returns {screen}* Returns the screen
	text: function (str, x, y, options = {}, redraw = false) {
		var defaults = {
					font:       'Helvetica',
					fontSize:   10,
					fillColor:  'rgba(0, 0, 0, 1)',
					lineColor:  'rgba(0, 0, 0, 1)',
					lineWidth:  0.05
					//size:       0.4
				},
				ctx, prop, opts;

		// Determine the layer to draw onto
		ctx = this.ctx;

		if (!redraw){
			opts = extendObject(defaults, options);
		}
		else {
			opts = options;
		}


		// Set the drawing options
		for (prop in opts) {
			if (opts.hasOwnProperty(prop)) {
				ctx[prop] = opts[prop];
			}
		}

		ctx.font = (opts.fontSize*this.screen.range.x) + 'px ' + opts.font;
		ctx.font = '10px Helvetica';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		// Draw the text
		var tf = this.screen.transformation;

		ctx.save();
			ctx.transform(1/tf[0][0],0,0,1/tf[1][1],0,0);
			ctx.fillText(str, tf[0][0]*x, tf[1][1]*y);
		ctx.restore();


		if (!redraw) {
			this.stack.push({
				type: 'text',
				object: str,
				x: x,
				y: y,
				options: opts
			});
		}

		return this;
	}
}