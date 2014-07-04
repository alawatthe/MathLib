/**
 * Writes text on the screen.
 *
 * @param {string} str The string to be drawn  
 * @param {number} x The x coordinate  
 * @param {number} y The y coordinate  
 * @param {drawingOptions} options Optional drawing options  
 * @return {Screen} Returns the screen
 */
text: function (str : string, x : number, y : number, options : drawingOptions = {}, redraw = false) : Screen2D {
	var defaults = {
				font: 'Helvetica',
				fontSize: 12,
				// lineWidth:  0.05,
				textColor: 'rgba(0, 0, 0, 1)'
			},
			ctx, prop, opts;

	ctx = this.ctx;

	opts = MathLib.Canvas.convertOptions(extendObject(defaults, options));


	// Set the drawing options
	for (prop in opts) {
		if (opts.hasOwnProperty(prop)) {
			ctx[prop] = opts[prop];
		}
	}

	ctx.fillStyle = colorConvert(options.textColor || options.color || defaults.textColor);
	ctx.strokeStyle = colorConvert(options.textColor || options.color || defaults.textColor);

	ctx.font = opts.fontSize + 'px ' + opts.font;
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';

	var tf = this.screen.transformation;

	ctx.save();
		ctx.transform(1 / tf[0][0], 0, 0, 1 / tf[1][1], 0, 0);
		ctx.fillText(str, tf[0][0] * x, tf[1][1] * y);
	ctx.restore();


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
},