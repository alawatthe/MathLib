/**
 * Returns a polynomial with the specified roots
 *
 * @param {array|Set} zeros The wished zeros.
 * @return {Polynomial}
 */
static roots(zeros) : Polynomial {
	var elemSymPoly, i, ii,
			coef = [];

	if (MathLib.type(zeros) === 'array') {
		zeros = new MathLib.Set(zeros);
	}

	elemSymPoly = zeros.powerset();
	for (i = 0, ii = zeros.card; i < ii; i++) {
		coef[i] = 0;
	}

	// Vieta's theorem
	elemSymPoly.slice(1).forEach(function (x) {
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