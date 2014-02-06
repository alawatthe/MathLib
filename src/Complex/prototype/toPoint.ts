/**
 * Interprets the complex number as point in the two dimensional plane
 *
 * @return {Point}
 */
toPoint() : Point {

	if (this.re === Infinity || MathLib.isNaN(this.re)) {
		return new MathLib.Point([0, 0, 0]);
	}

	return new MathLib.Point([this.re, this.im, 1]);
}