test('.sqrt()', 8, function () {
	// Spec. 1: MathLib.sqrt(NaN) = NaN
	equal(MathLib.isNaN(MathLib.sqrt(NaN)), true, 'Spec. 1: MathLib.sqrt(NaN) = NaN');

	// Spec. 2: MathLib.sqrt(+0) = +0
	equal(MathLib.isPosZero(MathLib.sqrt(+0)), true, 'Spec. 2: MathLib.sqrt(+0) = +0');

	// Spec. 3: MathLib.sqrt(-0) = -0
	equal(MathLib.isNegZero(MathLib.sqrt(-0)), true, 'Spec. 3: MathLib.sqrt(-0) = -0');

	// Spec. 4: MathLib.sqrt(+∞) = +∞
	equal(MathLib.sqrt(+Infinity), +Infinity, 'Spec. 4: MathLib.sqrt(+∞) = +∞');

	// Spec. 5: MathLib.sqrt(x) = NaN if x < 0
	equal(MathLib.isNaN(MathLib.sqrt(-Infinity)), true, 'Spec. 5: MathLib.sqrt(x) = NaN if x < 0');
	equal(MathLib.isNaN(MathLib.sqrt(-2)), true, 'Spec. 5: MathLib.sqrt(x) = NaN if x < 0');

	// Spec. 6: otherwise MathLib.sqrt(x) = square root of x
	equal(MathLib.sqrt(9), 3, 'Spec. 6: otherwise MathLib.sqrt(x) = square root of x');
	equal(MathLib.sqrt(2), 1.41421356237309504, 'Spec. 6: otherwise MathLib.sqrt(x) = square root of x');
});