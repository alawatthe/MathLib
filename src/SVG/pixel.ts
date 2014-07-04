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
			canvas = <any>document.createElement('canvas'),
			canvasCtx = canvas.getContext('2d'),
			svgImage = document.createElementNS('http://www.w3.org/2000/svg', 'image'),
			svgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'g'),
			x, y, i, pxl,
			m = screen.transformation;

	canvas.width = screen.width;
	canvas.height = screen.height;
	canvasCtx.setTransform(m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2]);



	svgContainer.setAttribute('transform', 'matrix(' +
		1 / m[0][0] + ', 0, 0, ' +
		1 / m[1][1] + ', -' + m[0][2] / m[0][0] + ', ' + -m[1][2] / m[1][1] +
	')');
	svgImage.setAttribute('width', screen.width + 'px');
	svgImage.setAttribute('height', screen.height + 'px');
	svgImage.setAttribute('x', '0');
	svgImage.setAttribute('y', '0');



	t = Math.min(top, t);
	r = Math.min(right, r);
	b = Math.max(bottom, b);
	l = Math.max(left, l);


	var tPxl = Math.floor(-t * screen.scale.y),
			rPxl = Math.floor(r * screen.scale.x),
			bPxl = Math.floor(-b * screen.scale.y),
			lPxl = Math.floor(l * screen.scale.x),
			w = (rPxl - lPxl),
			h = (tPxl - bPxl),
			imgData = canvasCtx.createImageData(w, h);



	for (y = tPxl, i = 0; y > bPxl; y--) {
		for (x = lPxl; x < rPxl; x++, i++) {
			pxl = f(x / screen.scale.x, y / screen.scale.y);
			imgData.data[4 * i]     = pxl[0];
			imgData.data[4 * i + 1] = pxl[1];
			imgData.data[4 * i + 2] = pxl[2];
			imgData.data[4 * i + 3] = pxl[3];
		}
	}

	canvasCtx.putImageData(imgData, 0, 0);

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