test('.csch()', 7, function () {
	// Spec. 1: MathLib.csch(NaN) = NaN
	equal(MathLib.isNaN(MathLib.csch(NaN)), true, 'Spec. 1: MathLib.csch(NaN) = NaN');

	// Spec. 2: MathLib.csch(+0) = +∞
	equal(MathLib.csch(+0), +Infinity, 'Spec. 2: MathLib.csch(+0) = +∞');

	// Spec. 3: MathLib.csch(-0) = -∞
	equal(MathLib.csch(-0), -Infinity, 'Spec. 3: MathLib.csch(-0) = -∞');

	// Spec. 4: MathLib.csch(+∞) = +0
	equal(MathLib.isPosZero(MathLib.csch(+Infinity)), true, 'Spec. 4: MathLib.csch(+∞) = +0');

	// Spec. 5: MathLib.csch(-∞) = -0
	equal(MathLib.isNegZero(MathLib.csch(-Infinity)), true, 'Spec. 5: MathLib.csch(-∞) = -0');

	// Spec. 6: otherwise MathLib.csch(x) = hyperbolic cosecant of x
	ok(MathLib.isEqual(MathLib.csch(1), 0.8509181282393216),
		'Spec. 6: otherwise MathLib.csch(x) = hyperbolic cosecant of x');
	ok(MathLib.isEqual(MathLib.csch(10), 0.00009079985971212217),
		'Spec. 6: otherwise MathLib.csch(x) = hyperbolic cosecant of x');
});