/**
 * Construct a complex number out of the absolute value and the argument
 *
 * @return {Complex}
 */
static polar = function (abs, arg) : Complex {
	if (abs === Infinity) {
		return new MathLib.Complex(Infinity);
	}
	return new MathLib.Complex(abs * Math.cos(arg), abs * Math.sin(arg));
};