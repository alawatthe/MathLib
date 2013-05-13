// ### Polynomial.prototype.plus()
// Adds a number or a polynomial
//
// *@return {Polynomial}*
plus(a) : Polynomial {
	var plus = [],
			i;
	if (typeof a === 'number') {
		plus = this.slice();
		plus[0] = MathLib.plus(plus[0], a);
	}
	else if (a.type === 'polynomial') {
		for (i = 0; i <= Math.min(this.deg, a.deg); i++) {
			plus[i] = MathLib.plus(this[i], a[i]);
		}
		plus = plus.concat((this.deg > a.deg ? this : a).slice(i));
	}
	return new MathLib.Polynomial(plus);
}