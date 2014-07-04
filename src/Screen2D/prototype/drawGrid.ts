/**
 * Draws the grid.
 *
 * @return {Screen2D}
 */
drawGrid() : Screen2D {

	if (!this.options.grid) {
		return this;
	}

	var i, ii, min, max,
			line   = (...args : any[]) => this.renderer.line.apply(this.layer.grid, args),
			circle = (...args : any[]) => this.renderer.circle.apply(this.layer.grid, args),
			top    = (            - this.translation.y) / this.scale.y,
			bottom = (this.height - this.translation.y) / this.scale.y,
			left   = (            - this.translation.x) / this.scale.x,
			right  = (this.width  - this.translation.x) / this.scale.x,
			yTick  = Math.pow(10, 1 - Math.floor(Math.log(-this.transformation[1][1]) / Math.LN10 - 0.3)),
			xTick  = Math.pow(10, 1 - Math.floor(Math.log( this.transformation[0][0]) / Math.LN10 - 0.3));


	if (this.options.grid.type === 'cartesian') {

		// The vertical lines
		if (this.options.grid.x) {
			for (i = left - (left % xTick); i <= right; i += xTick) {
				line([[i, bottom], [i, top]], extendObject(this.options.grid, this.options.grid.x), true);
			}
		}


		// The horizontal lines
		if (this.options.grid.y) {
			for (i = bottom - (bottom % yTick); i <= top; i += yTick) {
				line([[left, i], [right, i]], extendObject(this.options.grid, this.options.grid.y), true);
			}
		}


		// Test for logarithmic plots
		/*for (i = left - (left % this.axes.tick.x); i <= right; i += this.axes.tick.x) {
			for (var j = 1; j <= 10; j++ ) {
				this.line([[i * Math.log(10) + Math.log(j), bottom], [i * Math.log(10) + Math.log(j), top]], options);
			}
		}*/


	}
	else if (this.options.grid.type === 'polar') {
		max = Math.sqrt(Math.max(top * top, bottom * bottom) + Math.max(left * left, right * right));
		min = 0; // TODO: improve this estimate

		if (this.options.grid.angle) {
			for (i = 0, ii = 2 * Math.PI; i < ii; i += this.options.grid.angle.tick) {
				line([[0, 0],
					[max * Math.cos(i), max * Math.sin(i)]],
					extendObject(this.options.grid, this.options.grid.angle),
					true
				);
			}
		}

		if (this.options.grid.r) {
			for (i = min; i <= max; i += Math.min(xTick, yTick)) {
				circle(new MathLib.Circle([0, 0, 1], i), extendObject(this.options.grid, this.options.grid.r), true);
			}
		}
	}

	return this;
}