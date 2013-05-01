// ### Screen.prototype.drawAxis
// Draws the axis.
//
// *@returns {screen}*
drawAxis() {

	var line = (...args : any[]) => this.renderer.line.apply(this.layer.axis, args),
			text = (...args : any[]) => this.renderer.text.apply(this.layer.axis, args),
			options = {
				lineColor: colorConvert(this.options.axis.color),
				'stroke-width': -1 / this.transformation[1][1]
			},
			textOptions = {
				strokeStyle: colorConvert(this.options.axis.textColor),
				fillStyle: colorConvert(this.options.axis.textColor)
			},
			top     = (            - this.translation.y) / this.scale.y,
			bottom  = (this.height - this.translation.y) / this.scale.y,
			left    = (            - this.translation.x) / this.scale.x,
			right   = (this.width  - this.translation.x) / this.scale.x,
			lengthX = +10 / this.transformation[0][0],
			lengthY = -10 / this.transformation[1][1],

			yExp = 1 - Math.floor(Math.log(-this.transformation[1][1]) / Math.LN10 - 0.3),
			xExp = 1 - Math.floor(Math.log(+this.transformation[0][0]) / Math.LN10 - 0.3),
			yTick = Math.pow(10, yExp),
			xTick = Math.pow(10, xExp),
			i;

  if (!this.options.axis) {
		return this;
	}

	// The axes
	line([[left, 0], [right, 0]], options, true);
	line([[0, bottom], [0, top]], options, true);



	// The ticks on the axes
	// The x axis
	if(this.options.grid.tick) {
		for (i = -yTick; i >= left; i -= yTick) {
			line([[i, -lengthY], [i, lengthY]], options, true);
		}
		for (i = yTick; i <= right; i += yTick) {
			line([[i, -lengthY], [i, lengthY]], options, true);
		}

		// The y axis
		for (i = -xTick; i >= bottom; i -= xTick) {
			line([[-lengthX, i], [lengthX, i]], options, true);
		}
		for (i = xTick; i <= top; i += xTick) {
			line([[-lengthX, i], [lengthX, i]], options, true);
		}
	}


	// The labels
	// The x axis
	// .toFixed() is necessary to display 0.3 as "0.3" and not as "0.30000000000000004".
	// .toFixed expects arguments between 0 and 20.
	var xLen = Math.max(0, Math.min(20, -xExp)),
			yLen = Math.max(0, Math.min(20, -yExp));

	for (i = -yTick; i >= left; i -= yTick) {
		text(i.toFixed(yLen), i, -2*lengthY, textOptions, true);
	}
	for (i = yTick; i <= right; i += yTick) {
		text(i.toFixed(yLen), i, -2*lengthY, textOptions, true);
	}


	// The y axis
	for (i = -xTick; i >= bottom; i -= xTick) {
		text(i.toFixed(xLen), -2*lengthX, i, textOptions, true);
	}
	for (i = xTick; i <= top; i += xTick) {
		text(i.toFixed(xLen), -2*lengthX, i, textOptions, true);
	}

	return this;
}