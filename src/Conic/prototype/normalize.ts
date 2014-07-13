/**
 * Calculates the normal form of a conic.
 *
 * @return {Conic}
 */
normalize() : Conic {
	var A = this.primal[0][0],
			B = this.primal[0][1] * 2,
			C = this.primal[1][1],
			D = this.primal[0][2] * 2,
			E = this.primal[1][2] * 2,
			F = this.primal[2][2],

			r = Math.atan2(B, A - C) / 2,
			cos = Math.cos(r),
			sin = Math.sin(r),

			a = A * cos * cos + B * sin * cos + C * sin * sin,
			c = A * sin * sin - B * sin * cos + C * cos * cos,
			d = D * cos + E * sin,
			e = E * cos - D * sin,
			f = F;

	if (a !== 0) {
		f += -d * d / (4 * a);
		d = 0;
	}

	if (c !== 0) {
		f += -e * e / (4 * c);
		e = 0;
	}

	if (f !== 0) {
		a = -a / f;
		c = -c / f;
		d = -d / f;
		e = -e / f;
		f = -1;
	}

	return new MathLib.Conic(new MathLib.Matrix([[a, 0, d / 2], [0, c, e / 2], [d / 2, e / 2, f]]));
}
