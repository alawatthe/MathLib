// ### Canvas.line
// Draws a line on the screen.
//
// *@param {Line}* The line to be drawn  
// *@param {object}* [options] Optional drawing options  
// *@return {Screen}* Returns the screen
line: function (line, options = {}, redraw = false) {
	var screen = this.screen,
			points = this.screen.getLineEndPoints(line),
			ctx = this.ctx,
			prop, opts;

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