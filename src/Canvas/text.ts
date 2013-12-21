// ### Canvas.text
// Writes text on the screen.
//
// *@param {str}* The string to be drawn  
// *@param {x}* The x coordinate  
// *@param {y}* The y coordinate  
// *@param {object}* [options] Optional drawing options  
// *@return {Screen}* Returns the screen
text: function (str, x, y, options = {}, redraw = false) {
	var defaults = {
				font:       'Helvetica',
				fontSize:   12,
//				lineWidth:  0.05,
				textColor:  'rgba(0, 0, 0, 1)'
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

	ctx.fillStyle = colorConvert((<any>options).textColor || (<any>options).color || defaults.textColor);
	ctx.strokeStyle = colorConvert((<any>options).textColor || (<any>options).color || defaults.textColor);

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