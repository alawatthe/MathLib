/**
 * Draws the conic on one or more screens
 *
 * @param {Screen} screen The screen to draw onto.
 * @param {object} options Drawing options
 * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
 * @return {Conic} Returns the conic for chaining
 */
draw(screen, options : pathDrawingOptions = {}, redraw = false) : Conic {
	if (Array.isArray(screen)) {
		var conic = this;
		screen.forEach(function (x) {
			conic.draw(x, options);
		});
	}
	else {
		options.from = 0;
		options.to = 2 * Math.PI;
		options.conic = this;

		var lines, alpha, cos, sin, sgn,
				a = this.primal[0][0],
				b = this.primal[0][1] * 2,
				c = this.primal[1][1],
				d = this.primal[0][2] * 2,
				e = this.primal[1][2] * 2,
				disc = 4 * a * c - b * b,
				rank = this.primal.rank(),
				cx = (b * e - 2 * c * d) / (4 * a * c - b * b),
				cy = (b * d - 2 * a * e) / (4 * a * c - b * b),

				normalForm = this.normalize(),
				A = Math.sqrt(Math.abs(normalForm.primal[2][2] / normalForm.primal[0][0])),
				C = Math.sqrt(Math.abs(normalForm.primal[2][2] / normalForm.primal[1][1]));




		if (rank === 3) {
			alpha = Math.atan2(b, a - c) / 2;
			cos = Math.cos(alpha);
			sin = Math.sin(alpha);


			// Parabola
			if (disc === 0) {

				options.from = -10;
				options.to = 10;

				var param = -this.primal[1][2] / (2 * this.primal[0][0]);
				cx = 0;
				cy = this.primal[2][2] / this.primal[0][0];


				screen.path([
					t => cx + cos * param * t * t - sin * 2 * param * t,
					t => cy + sin * param * t * t + cos * 2 * param * t
				], options, redraw);
			}


			// Ellipse
			else if (disc > 0) {
				options.from = 0;
				options.to = 2 * Math.PI;

				screen.path([
					t => cx + cos * Math.cos(t) * A - sin * Math.sin(t) * C,
					t => cy + sin * Math.cos(t) * A + cos * Math.sin(t) * C
				], options, redraw);
			}


			// Hyperbola
			else if (disc < 0) {
				options.from = 0;
				options.to = 2 * Math.PI;
				// This function changes the direction of the path for the second branch.
				// Otherwise we get some lines which shouldn't be there.
				sgn = function (t) {
					return +((t + Math.PI / 2) % (2 * Math.PI) < Math.PI) * 2 - 1;
				};



				if (normalForm.primal[2][2] * normalForm.primal[0][0] > 0) {
					var swap = A;
					A = C;
					C = swap;

					cos = Math.cos(alpha + Math.PI / 2);
					sin = Math.sin(alpha + Math.PI / 2);

				}
				else {
					cos = Math.cos(alpha);
					sin = Math.sin(alpha);
				}

				screen.path([
					t => cx + cos * MathLib.sec(t) * A - sin * MathLib.tan(t) * C * sgn(t),
					t => cy + sin * MathLib.sec(t) * A + cos * MathLib.tan(t) * C * sgn(t)
				], options, redraw);
			}


		}

		else if (rank === 2) {
			lines = this.splitDegenerated();

			screen.line(lines[0], options);
			screen.line(lines[1], options);
		}

		else if (rank === 1) {
			lines = this.splitDegenerated();

			screen.line(lines[0], options);
		}


	}
	return this;
}
