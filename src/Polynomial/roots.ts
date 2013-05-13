// ### Polynomial.roots
// Returns a polynomial with the specified roots
//
// *@return {Polynomial}*
static roots(zeros) : Polynomial {
	var elemSymPoly, coef = [], i, ii;
	if (MathLib.type(zeros) === 'array') {
		zeros = MathLib.set(zeros, true);
	}

	elemSymPoly = zeros.powerset();
	for (i = 0, ii = zeros.card; i < ii; i++) {
		coef[i] = 0; 
	}

	// Vieta's theorem
	elemSymPoly.slice(1).forEach(function (x, i) {
		coef[ii - x.card] = MathLib.plus(coef[ii - x.card], x.times());
	});

	coef = coef.map(function (x, i) {
		if ((ii - i) % 2) {
			return MathLib.negative(x);
		}
		return x;
	});

	coef.push(1);
	return new MathLib.Polynomial(coef);
}