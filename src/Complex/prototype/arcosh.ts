/**
 * Returns the inverse hyperbolic cosine of the number
 *
 * @return {Complex}
 */
arcosh() : Complex {
	var arccos;

	if (this.isZero()) {
		return new MathLib.Complex(0, 1.5707963267948966192);
	}

	arccos = this.arccos();
	arccos = arccos.times(new MathLib.Complex(0, arccos.im > 0 ? -1 : 1));

	if (MathLib.isNegZero(this.im) && this.re >= -1) {
		arccos.im = -arccos.im;
	}

	return arccos;
}
