var svg = {

	normalizeOptions: function (opt) {
		var res:any = {};
		if ('fillColor' in opt) {
			res.fill = opt.fillColor
		}
		else if ('color' in opt) {
			res.fill = opt.color
		}


		if ('font' in opt) {
			res['font-family'] = opt.font
		}

		if ('fontSize' in opt) {
			res['font-size'] = opt.fontSize
		}

		if ('size' in opt) {
			res.size = opt.size
		}


		if ('lineColor' in opt) {
			res.stroke = opt.lineColor
		}
		else if ('color' in opt) {
			res.stroke = opt.color
		}


		if ('dash' in opt && opt.dash.length !== 0) {
			res['stroke-dasharray'] = opt.dash
		}

		if ('dashOffset' in opt && opt.dashOffset !== 0) {
			res['stroke-dashoffset'] = opt.dashOffset
		}


		return res;
	},


	applyTransformation: function () {
		var m = this.transformation;
		this.layer.forEach(function(l){
			l.ctx.setAttribute('transform',
				'matrix(' + m[0][0]+ ',' + m[1][0]+ ',' + m[0][1]+ ',' + m[1][1]+ ',' + m[0][2]+ ',' + m[1][2] + ')' )});
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





	// ### SVG circle
	// Draws a circle on the screen.
	//
	// *@param {circle}* The circle to be drawn  
	// *@param {object}* [options] Optional drawing options  
	// *@returns {canvas}* Returns the screen
	circle: function (circle, options, redraw) {
		var screen = this.screen,
				prop, opts,
				svgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

		svgCircle.setAttribute('cx', circle.center[0]);
		svgCircle.setAttribute('cy', circle.center[1]);
		svgCircle.setAttribute('r', circle.radius);

		if (options) {
			svgCircle.setAttribute('stroke-width', (options.lineWidth || 4 )/(screen.scale.x - screen.scale.y) + '');
			opts = svg.normalizeOptions(options);
			for (prop in opts) {
				if (opts.hasOwnProperty(prop)) {
					svgCircle.setAttribute(prop, opts[prop]);
				}
			}
		}

		this.ctx.appendChild(svgCircle)

		if (!redraw) {
			this.stack.push({
				type: 'circle',
				object: circle,
				options: options
			});
		}

		return this;
	},







	// ### SVG line
	// Draws a line on the screen.
	//
	// *@param {line}* The line to be drawn  
	// *@param {object}* [options] Optional drawing options  
	// *@returns {canvas}* Returns the screen
	line: function (line, options, redraw) {
		var screen = this.screen,
				points = this.screen.getLineEndPoints(line),
				prop, opts,
				svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');

		svgLine.setAttribute('x1', points[0][0]);
		svgLine.setAttribute('y1', points[0][1]);
		svgLine.setAttribute('x2', points[1][0]);
		svgLine.setAttribute('y2', points[1][1]);

		if (options) {
			svgLine.setAttribute('stroke-width', (options.lineWidth || 4 )/(screen.scale.x - screen.scale.y) + '');
			opts = svg.normalizeOptions(options);
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





	// ### SVG path
	// Draws a path on the screen.
	//
	// *@param {curve}* The path to be drawn  
	// *@param {object}* [options] Optional drawing options  
	// *@returns {screen}* Returns the screen
	path: function (curve, options, redraw) {
		var screen = this.screen,
				svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path'),
				step = 2/(screen.scale.x - screen.scale.y),
				pathString, from, to, prop, opts, x, y, i, path;

		from = ('from' in options ? options.from : ( - screen.translation.x) / screen.scale.x)-step;
		to = ('to' in options ? options.to : (screen.width  - screen.translation.x) / screen.scale.x)+step;


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

		pathString = 'M' + path.reduce(function(prev, cur) {
			return prev + ' L' + cur.join(' ');
		});
		svgPath.setAttribute('d', pathString);

		svgPath.setAttribute('stroke-width', (options.lineWidth || 4 )/(screen.scale.x - screen.scale.y) + '');


		if (options) {
			opts = svg.normalizeOptions(options);
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




	// ### SVG pixel
	// Draws pixel on the screen.
	//
	// *@param {path}* The path to be drawn  
	// *@param {top}* The top coordinate of the draw rectangle  
	// *@param {right}* The right coordinate of the draw rectangle  
	// *@param {bottom}* The bottom coordinate of the draw rectangle  
	// *@param {left}* The left coordinate of the draw rectangle  
	// *@param {object}* [options] Optional drawing options  
	// *@returns {screen}* Returns the screen
	pixel: function (f, t, r, b, l, options, redraw = false) {
		var screen = this.screen,
				top     = (              - screen.translation.y) / screen.scale.y,
				bottom  = (screen.height - screen.translation.y) / screen.scale.y,
				left    = (              - screen.translation.x) / screen.scale.x,
				right   = (screen.width  - screen.translation.x) / screen.scale.x,
				ctx = this.ctx,
				canvas = <any>document.createElement('canvas'),
				canvasCtx = canvas.getContext('2d'),
				svgImage = document.createElementNS('http://www.w3.org/2000/svg', 'image'),
				svgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'g'),
				dataURL, prop, opts, x, y, i, pxl,
				m = screen.transformation;

		canvas.width = screen.width;
		canvas.height = screen.height;
		canvasCtx.setTransform(m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2])



		svgContainer.setAttribute('transform', 'matrix('+1/m[0][0]+',0,0,'+1/m[1][1]+',-'+m[0][2]/m[0][0]+','+-m[1][2]/m[1][1]+')');
		svgImage.setAttribute('width', screen.width+'px');
		svgImage.setAttribute('height', screen.height+'px');
		svgImage.setAttribute('x', '0');
		svgImage.setAttribute('y', '0');



		t = Math.min(top, t);
		r = Math.min(right, r);
		b = Math.max(bottom, b);
		l = Math.max(left, l);


		var tPxl = Math.floor(-t*screen.scale.y),
				rPxl = Math.floor(r*screen.scale.x),
				bPxl = Math.floor(-b*screen.scale.y),
				lPxl = Math.floor(l*screen.scale.x),
				w = (rPxl-lPxl),
				h = (tPxl-bPxl),
				imgData = canvasCtx.createImageData(w, h);



		for (y = tPxl, i = 0; y > bPxl; y--) {
			for (x = lPxl; x < rPxl; x++, i++) {
				pxl = f(x/screen.scale.x, y/screen.scale.y);
				imgData.data[4*i]   = pxl[0];
				imgData.data[4*i+1] = pxl[1];
				imgData.data[4*i+2] = pxl[2];
				imgData.data[4*i+3] = pxl[3];
			}
		}

		canvasCtx.putImageData(imgData, 0,0);

		svgImage.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', canvas.toDataURL());

		svgContainer.appendChild(svgImage);
		this.ctx.appendChild(svgContainer);

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



	// ### SVG text
	// Writes text on the screen.
	//
	// *@param {str}* The string to be drawn  
	// *@param {x}* The x coordinate  
	// *@param {y}* The y coordinate  
	// *@param {object}* [options] Optional drawing options  
	// *@returns {canvas}* Returns the canvas
	text: function (str, x, y, options, redraw) {
	  var screen = this.screen,
	      svgText = document.createElementNS('http://www.w3.org/2000/svg', 'text'),
		    ctx = this.ctx,
	      prop, opts;

		svgText.textContent = str;
		svgText.setAttribute('x', x*screen.scale.x + '');
		svgText.setAttribute('y', y*screen.scale.y + '');
		svgText.setAttribute('transform', 'matrix(' + 1/screen.scale.x + ' , 0, 0, ' + 1/screen.scale.y + ', 0, 0)');
		svgText.setAttribute('fill', colorConvert(options.color) || '#000000');
		svgText.setAttribute('fill-opacity', '1');
		svgText.setAttribute('stroke', colorConvert(options.color) || '#000000');
		svgText.setAttribute('text-anchor', 'middle');

		// alignment-baseline isn't defined for text elements, 
		// only for ‘tspan’, ‘tref’, ‘altGlyph’, ‘textPath’ elements.  
		// see the [Specification](http://www.w3.org/TR/SVG/text.html#AlignmentBaselineProperty)  
		// But it works for text elements, so we don't need an additional tspan element.
		svgText.setAttribute('alignment-baseline', 'middle');


		this.ctx.appendChild(svgText);

		if (!redraw) {
			this.stack.push({
				type: 'text',
				object: str,
				x: x,
				y: y,
				options: options
			});
		}

	  return this;
	}
}