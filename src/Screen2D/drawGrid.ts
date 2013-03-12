// ### Screen.prototype.drawGrid
// Draws the grid.
//
// *@returns {screen}*
var drawGrid = function () {
	if (!this.screen.grid) {
		return this;
	}

	var screen = this.screen,
			top     = (              - screen.translation.y) / screen.scale.y,
			bottom  = (screen.height - screen.translation.y) / screen.scale.y,
			left    = (              - screen.translation.x) / screen.scale.x,
			right   = (screen.width  - screen.translation.x) / screen.scale.x,
			yTick = Math.pow(10, 1-Math.floor(Math.log(-screen.transformation[1][1])/Math.LN10-0.3)),
			xTick = Math.pow(10, 1-Math.floor(Math.log(+screen.transformation[0][0])/Math.LN10-0.3)),
			i;


	if (screen.grid.type === 'cartesian') {


		// The horizontal lines
		for (i = bottom-(bottom%yTick); i <= top; i += yTick) {
			this.line([[left, i], [right, i]], false, true);
		}


		// The vertical lines
		for (i = left-(left%xTick); i <= right; i += xTick) {
			this.line([[i, bottom], [i, top]], false, true);
		}


		// Test for logarithmic plots
		/*for (i = left-(left%this.axis.tick.x); i <= right; i += this.axis.tick.x) {
			for (var j = 1 ; j <=10; j++ ) {
				this.line([[i*Math.log(10)+ Math.log(j), bottom], [i*Math.log(10)+Math.log(j), top]], options);
			}
		}*/


	}
	else if (screen.grid.type === 'polar') {
		var max = Math.sqrt(Math.max(top*top, bottom*bottom) + Math.max(left*left, right*right)),
				min = 0; // improve this estimate

		for (i = 0; i < 2*Math.PI; i += screen.grid.angle) {
			this.line([[0, 0], [max*Math.cos(i), max*Math.sin(i)]], false, true);
		}

		for (i = min; i <= max; i += Math.min(xTick, yTick)) {
			this.circle(new MathLib.Circle([0, 0, 1], i), false, true);
		}
	}

	return this;
}