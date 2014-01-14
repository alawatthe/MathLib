/**
 * Calculates the difference of two complex numbers
 *
 * @param {number|Complex} subtrahend The subtrahend  
 * @return {Complex}
 */
minus(subtrahend) : Complex {
	return this.plus(MathLib.negative(subtrahend));
}