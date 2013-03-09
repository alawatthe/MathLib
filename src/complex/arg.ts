// ### Complex.prototype.arg()
// Returns the argument (= the angle) of the complex number
//
// *@returns {number}*
arg() : number {
	return Math.atan2(this.im, this.re);
}