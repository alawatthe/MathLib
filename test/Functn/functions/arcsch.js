test('.arcsch()', 7, function () {
	// Spec. 1: MathLib.arcsch(NaN) = NaN
	equal(MathLib.isNaN(MathLib.arcsch(NaN)), true, 'Spec. 1: MathLib.arcsch(NaN) = NaN');

	// Spec. 2: MathLib.arcsch(+0) = +∞
	equal(MathLib.arcsch(+0), +Infinity, 'Spec. 2: MathLib.arcsch(+0) = +∞');

	// Spec. 3: MathLib.arcsch(-0) = -∞
	equal(MathLib.arcsch(-0), -Infinity, 'Spec. 3: MathLib.arcsch(-0) = -∞');

	// Spec. 4: MathLib.arcsch(+∞) = +0
	equal(MathLib.isPosZero(MathLib.arcsch(+Infinity)), true, 'Spec. 4: MathLib.arcsch(+∞) = +0');

	// Spec. 5: MathLib.arcsch(-∞) = -0
	equal(MathLib.isNegZero(MathLib.arcsch(-Infinity)), true, 'Spec. 5: MathLib.arcsch(-∞) = -0');

	// Spec. 6: otherwise MathLib.arcsch(x) = inverse hyperbolic cosecant of x
	equal(MathLib.arcsch(1), 0.8813735870195429, 'Spec. 6: otherwise MathLib.arcsch(x) = inverse hyperbolic cosecant of x');
	equal(MathLib.arcsch(10), 0.09983407889920758, 'Spec. 6: otherwise MathLib.arcsch(x) = inverse hyperbolic cosecant of x');
});