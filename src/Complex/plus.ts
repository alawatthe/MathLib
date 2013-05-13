// ### Complex.prototype.plus()
// Add complex numbers
//
// *@param {Complex|number|Rational}* The number to be added  
// *@return {Complex}*
plus(c) : Complex {
	if (c.type === 'complex') {
		return new MathLib.Complex(MathLib.plus(this.re, c.re), MathLib.plus(this.im, c.im));
	}
	else if (c.type === 'rational') {
		c = c.toNumber();
	}
	if (typeof c === 'number') {
		return new MathLib.Complex(MathLib.plus(this.re, c), this.im);
	}
}