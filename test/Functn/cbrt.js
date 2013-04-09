test('.cbrt()', 7, function () {
	// Spec. 1: MathLib.cbrt(NaN) = NaN
	equal(MathLib.isNaN(MathLib.cbrt(NaN)), true, 'Spec. 1: MathLib.cbrt(NaN) = NaN');

	// Spec. 2: MathLib.cbrt(+0) = +0
	equal(MathLib.isPosZero(MathLib.cbrt(+0)), true, 'Spec. 2: MathLib.cbrt(+0) = +0');

	// Spec. 3: MathLib.cbrt(-0) = -0
	equal(MathLib.isNegZero(MathLib.cbrt(-0)), true, 'Spec. 3: MathLib.cbrt(-0) = -0');

	// Spec. 4: MathLib.cbrt(+∞) = +∞
	equal(MathLib.cbrt(+Infinity), +Infinity, 'Spec. 4: MathLib.cbrt(+∞) = +∞');

	// Spec. 5: MathLib.cbrt(-∞) = -∞
	equal(MathLib.cbrt(-Infinity), -Infinity, 'Spec. 5: MathLib.cbrt(-∞) = -∞');

	// Spec. 6: otherwise MathLib.cbrt(x) = cube root of x
	equal(MathLib.cbrt(8), 2, 'Spec. 6: otherwise MathLib.cbrt(x) = cube root of x');
	equal(MathLib.cbrt(-8), -2, 'Spec. 6: otherwise MathLib.cbrt(x) = cube root of x');
});