/**
 * Returns the inverse hyperbolic sine of the number
 *
 * @return {Complex}
 */
arsinh() : Complex {
	var a = this.re,
			b = this.im,
			aa = a * a,
			bb = b * b,
			sqrt = Math.sqrt(Math.pow(aa + bb - 1, 2) + 4 * aa),
			sgn = function (x) {
				if (x > 0) {
					return 1;
				}
				if (x < 0) {
					return -1;
				}
				if (1 / x === Infinity) {
					return 1;
				}
				if (1 / x === -Infinity) {
					return -1;
				}
			};

	if (a === Infinity) {
		return new MathLib.Complex(Infinity);
	}

	return new MathLib.Complex(
			sgn(a) / 2 * MathLib.arcosh(sqrt + (aa + bb)),
			sgn(b) / 2 * MathLib.arccos(sqrt - (aa + bb))
		);
}