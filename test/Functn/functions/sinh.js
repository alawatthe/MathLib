test('.sinh()', 7, function () {
	// Spec. 1: MathLib.sinh(NaN) = NaN
	equal(MathLib.isNaN(MathLib.sinh(NaN)), true, 'Spec. 1: MathLib.sinh(NaN) = NaN');

	// Spec. 2: MathLib.sinh(+0) = +0
	equal(MathLib.isPosZero(MathLib.sinh(+0)), true, 'Spec. 2: MathLib.sinh(+0) = +0');

	// Spec. 3: MathLib.sinh(-0) = -0
	equal(MathLib.isNegZero(MathLib.sinh(-0)), true, 'Spec. 3: MathLib.sinh(-0) = -0');

	// Spec. 4: MathLib.sinh(+∞) = +∞
	equal(MathLib.sinh(+Infinity), +Infinity, 'Spec. 4: MathLib.sinh(+∞) = +∞');

	// Spec. 5: MathLib.sinh(-∞) = -∞
	equal(MathLib.sinh(-Infinity), -Infinity, 'Spec. 5: MathLib.sinh(-∞) = -∞');

	// Spec. 6: otherwise MathLib.sinh(x) = hyperbolic sine of x
	ok(MathLib.isEqual(MathLib.sinh(1), 1.1752011936438014), 'Spec. 6: otherwise MathLib.sinh(x) = hyperbolic sine of x');
	ok(MathLib.isEqual(MathLib.sinh(2), 3.6268604078470188), 'Spec. 6: otherwise MathLib.sinh(x) = hyperbolic sine of x');
});