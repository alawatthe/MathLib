// ### Screen2D.prototype.drawGrid
// Draws the grid.
//
// *@returns {Screen2D}*
drawGrid() {

	if (!this.options.grid) {
		return this;
	}

	var line   = (...args : any[]) => this.renderer.line.apply(this.layer.grid, args),
			circle = (...args : any[]) => this.renderer.circle.apply(this.layer.grid, args),
			top    = (            - this.translation.y) / this.scale.y,
			bottom = (this.height - this.translation.y) / this.scale.y,
			left   = (            - this.translation.x) / this.scale.x,
			right  = (this.width  - this.translation.x) / this.scale.x,
			yTick  = Math.pow(10, 1 - Math.floor(Math.log(-this.transformation[1][1]) / Math.LN10 - 0.3)),
			xTick  = Math.pow(10, 1 - Math.floor(Math.log(+this.transformation[0][0]) / Math.LN10 - 0.3)),
			i;


	if (this.options.grid.type === 'cartesian') {

		// The horizontal lines
		for (i = bottom - (bottom % yTick); i <= top; i += yTick) {
			line([[left, i], [right, i]], false, true);
		}


		// The vertical lines
		for (i = left - (left % xTick); i <= right; i += xTick) {
			line([[i, bottom], [i, top]], false, true);
		}


		// Test for logarithmic plots
		/*for (i = left-(left%this.axis.tick.x); i <= right; i += this.axis.tick.x) {
			for (var j = 1 ; j <=10; j++ ) {
				this.line([[i*Math.log(10)+ Math.log(j), bottom], [i*Math.log(10)+Math.log(j), top]], options);
			}
		}*/


	}
	else if (this.options.grid.type === 'polar') {
		var max = Math.sqrt(Math.max(top*top, bottom*bottom) + Math.max(left*left, right*right)),
				min = 0; // TODO: improve this estimate

		for (i = 0; i < 2*Math.PI; i += this.options.grid.angle) {
			line([[0, 0], [max*Math.cos(i), max*Math.sin(i)]], false, true);
		}

		for (i = min; i <= max; i += Math.min(xTick, yTick)) {
			circle(new MathLib.Circle([0, 0, 1], i), false, true);
		}
	}

	return this;
}