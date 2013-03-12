// ### Polynomial.prototype.plus()
// Adds a number or a polynomial
//
// *@returns {polynomial}*
plus(a) : Polynomial {
	var temparr = [],
			i;
	if (typeof a === 'number') {
		temparr = this.slice();
		temparr[0] = MathLib.plus(temparr[0], a);
	}
	else if (a.type === 'polynomial') {
		for (i = 0; i <= Math.min(this.deg, a.deg); i++) {
			temparr[i] = MathLib.plus(this[i],	a[i]);
		}
		temparr = temparr.concat((this.deg > a.deg ? this : a).slice(i));
	}
	return new MathLib.Polynomial(temparr);
}