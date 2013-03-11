// ### Screen.prototype.drawAxis
// Draws the axis.
//
// *@returns {screen}*
var drawAxis = function () {
	var screen = this.screen,
			options = {
				stroke: colorConvert(this.screen.axis.color),
				'stroke-width': -1/screen.transformation[1][1]
			},
			textOptions = {
				strokeStyle: colorConvert(this.screen.axis.textColor),
				fillStyle: colorConvert(this.screen.axis.textColor)
			},
			top     = (              - screen.translation.y) / screen.scale.y,
			bottom  = (screen.height - screen.translation.y) / screen.scale.y,
			left    = (              - screen.translation.x) / screen.scale.x,
			right   = (screen.width  - screen.translation.x) / screen.scale.x,
			lengthX = +10/screen.transformation[0][0],
			lengthY = -10/screen.transformation[1][1],

			yExp = 1-Math.floor(Math.log(-screen.transformation[1][1])/Math.LN10-0.3),
			xExp = 1-Math.floor(Math.log(+screen.transformation[0][0])/Math.LN10-0.3),
			yTick = Math.pow(10, yExp),
			xTick = Math.pow(10, xExp),
			i;

  if (!this.screen.axis) {
		return this;
	}

	// The axes
	this.line([[left, 0], [right, 0]], false, true);
	this.line([[0, bottom], [0, top]], false, true);



	// The ticks on the axes
	// The x axis
	if(screen.grid.tick) {
		for (i = -yTick; i >= left; i -= yTick) {
			this.line([[i, -lengthY], [i, lengthY]], false, true);
		}
		for (i = yTick; i <= right; i += yTick) {
			this.line([[i, -lengthY], [i, lengthY]], false, true);
		}

		// The y axis
		for (i = -xTick; i >= bottom; i -= xTick) {
			this.line([[-lengthX, i], [lengthX, i]], false, true);
		}
		for (i = xTick; i <= top; i += xTick) {
			this.line([[-lengthX, i], [lengthX, i]], false, true);
		}
	}


	// The labels
	// The x axis
	// .toFixed() is necessary to display 0.3 as "0.3" and not as "0.30000000000000004".
	// .toFixed expects arguments between 0 and 20.
	var xLen = Math.max(0, Math.min(20, -xExp)),
			yLen = Math.max(0, Math.min(20, -yExp));

	for (i = -yTick; i >= left; i -= yTick) {
		this.text(i.toFixed(yLen), i, -2*lengthY, textOptions, true);
	}
	for (i = yTick; i <= right; i += yTick) {
		this.text(i.toFixed(yLen), i, -2*lengthY, textOptions, true);
	}


	// The y axis
	for (i = -xTick; i >= bottom; i -= xTick) {
		this.text(i.toFixed(xLen), -2*lengthX, i, textOptions, true);
	}
	for (i = xTick; i <= top; i += xTick) {
		this.text(i.toFixed(xLen), -2*lengthX, i, textOptions, true);
	}

	return this;
}
