// ### Polynomial.roots
// Returns a polynomial with the specified roots
//
// *@returns {polynomial}*
static roots(zeros) {
	var temp, coef = [], i, ii;
	if (MathLib.type(zeros) === 'array') {
		zeros = MathLib.set(zeros, true);
	}

	temp = zeros.powerset();
	for (i=0, ii=zeros.card; i<ii; i++) {
		coef[i] = 0; 
	}

	// Vieta's theorem
	temp.slice(1).forEach(function (x, i) {
		coef[ii-x.card] = MathLib.plus(coef[ii-x.card], x.times());
	});

	coef = coef.map(function (x, i) {
		if((ii-i)%2) {
			return MathLib.negative(x);
		}
		return x;
	});

	coef.push(1);
	return new MathLib.Polynomial(coef);
}