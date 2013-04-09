test('.cos()', 6, function () {
	// Spec. 1: MathLib.cos(NaN) = NaN
	equal(MathLib.isNaN(MathLib.cos(NaN)), true, 'Spec. 1: MathLib.cos(NaN) = NaN');

	// Spec. 2: MathLib.cos(+∞) = NaN
	equal(MathLib.isNaN(MathLib.cos(+Infinity)), true, 'Spec. 2: MathLib.cos(+∞) = NaN');

	// Spec. 3: MathLib.cos(-∞) = NaN
	equal(MathLib.isNaN(MathLib.cos(-Infinity)), true, 'Spec. 3: MathLib.cos(-∞) = NaN');

	// Spec. 4: otherwise MathLib.cos(x) = cosine of x
	equal(MathLib.cos(+0), 1, 'Spec. 4: otherwise MathLib.cos(x) = cosine of x');
	equal(MathLib.cos(-0), 1, 'Spec. 4: otherwise MathLib.cos(x) = cosine of x');
	equal(MathLib.cos(Math.PI), -1, 'Spec. 4: otherwise MathLib.cos(x) = cosine of x');
});