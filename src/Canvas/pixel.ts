/**
 * Draws pixel on the screen.
 *
 * @param {function} f The pixel function
 * @param {number} t The top coordinate of the draw rectangle
 * @param {number} r The right coordinate of the draw rectangle
 * @param {number} b The bottom coordinate of the draw rectangle
 * @param {number} l The left coordinate of the draw rectangle
 * @param {drawingOptions} options Optional drawing options
 * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
 * @return {Screen} Returns the screen
 */
pixel: function (f, t : number, r : number, b : number, l : number, options : drawingOptions = {}, redraw = false) : Screen2D {
	var screen = this.screen,
			top     = (              - screen.translation.y) / screen.scale.y,
			bottom  = (screen.height - screen.translation.y) / screen.scale.y,
			left    = (              - screen.translation.x) / screen.scale.x,
			right   = (screen.width  - screen.translation.x) / screen.scale.x,
			ctx = this.ctx,
			x, y, i;

	t = Math.min(top, t);
	r = Math.min(right, r);
	b = Math.max(bottom, b);
	l = Math.max(left, l);


	var tPxl = Math.floor(-t * screen.scale.y),
			rPxl = Math.floor( r * screen.scale.x),
			bPxl = Math.floor(-b * screen.scale.y),
			lPxl = Math.floor( l * screen.scale.x),
			w = (rPxl - lPxl),
			h = (bPxl - tPxl),
			imgData = ctx.createImageData(w, h),
			pxl;


	for (y = tPxl, i = 0; y > bPxl; y--) {
		for (x = lPxl; x < rPxl; x++, i++) {
			pxl = f(x / screen.scale.x, y / screen.scale.y);
			imgData.data[4 * i]     = pxl[0];
			imgData.data[4 * i + 1] = pxl[1];
			imgData.data[4 * i + 2] = pxl[2];
			imgData.data[4 * i + 3] = pxl[3];
		}
	}

	ctx.putImageData(imgData, (left - l) * screen.scale.x, (t - top) * screen.scale.y);


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