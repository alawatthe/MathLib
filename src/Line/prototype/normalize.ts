/**
 * Normalizes the line.
 *
 * @return {Line}
 */
normalize() : Line {
	var h = MathLib.hypot(this[0], this[1]);

	if (h !== 0) {
		return this.map(function (x) {
			return x / h;
		});
	}
	else {
		return new MathLib.Line([0, 0, 1]);
	}
}