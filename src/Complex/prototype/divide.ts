/**
 * Divides a complex number by an other
 *
 * @param {number|Complex} divisor The divisor  
 * @return {Complex}
 */
divide(divisor) : Complex {
	return this.times(MathLib.inverse(divisor));
}