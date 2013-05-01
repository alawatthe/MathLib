// ### Canvas.text
// Writes text on the screen.
//
// *@param {str}* The string to be drawn  
// *@param {x}* The x coordinate  
// *@param {y}* The y coordinate  
// *@param {object}* [options] Optional drawing options  
// *@returns {screen}* Returns the screen
text: function(str, x, y, options = {}, redraw = false) {
	var defaults = {
				font:       'Helvetica',
				fontSize:   10,
				fillColor:  'rgba(0, 0, 0, 1)',
				lineColor:  'rgba(0, 0, 0, 1)',
				lineWidth:  0.05
			},
			ctx, prop, opts;

	// Determine the layer to draw onto
	ctx = this.ctx;

	opts = MathLib.Canvas.convertOptions(extendObject(defaults, options));


	// Set the drawing options
	for (prop in opts) {
		if (opts.hasOwnProperty(prop)) {
			ctx[prop] = opts[prop];
		}
	}

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
			options: options
		});
	}

	return this;
},