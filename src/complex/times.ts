// ### Complex.prototype.times()
// Multiplies complex numbers
//
// *@param {complex}* The number to be multiplied  
// *@returns {complex}*
times(c) {
	if (c.type === 'complex') {
		return new MathLib.Complex(MathLib.minus(MathLib.times(this.re, c.re), MathLib.times(this.im, c.im)),
			MathLib.plus(MathLib.times(this.re, c.im), MathLib.times(this.im, c.re)));
	}
	else if (c.type === 'rational') {
		c = c.toNumber();
	}
	if (typeof c === 'number') {
		return new MathLib.Complex(MathLib.times(this.re, c), MathLib.times(this.im, c));
	}
}