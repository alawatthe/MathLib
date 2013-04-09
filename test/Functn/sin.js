test('.sin()', 7, function () {
	// Spec. 1: MathLib.sin(NaN) = NaN
	equal(MathLib.isNaN(MathLib.sin(NaN)), true, 'Spec. 1: MathLib.sin(NaN) = NaN');

	// Spec. 2: MathLib.sin(+0) = +0
	equal(MathLib.isPosZero(MathLib.sin(+0)), true, 'Spec. 2: MathLib.sin(+0) = +0');

	// Spec. 3: MathLib.sin(-0) = -0
	equal(MathLib.isNegZero(MathLib.sin(-0)), true, 'Spec. 3: MathLib.sin(-0) = -0');

	// Spec. 4: MathLib.sin(+∞) = NaN
	equal(MathLib.isNaN(MathLib.sin(+Infinity)), true, 'Spec. 4: MathLib.sin(+∞) = NaN');

	// Spec. 5: MathLib.sin(-∞) = NaN
	equal(MathLib.isNaN(MathLib.sin(-Infinity)), true, 'Spec. 5: MathLib.sin(-∞) = NaN');

	// Spec. 6: otherwise MathLib.sin(x) = sine of x
	equal(MathLib.sin(Math.PI / 2), 1, 'Spec. 6: otherwise MathLib.sin(x) = sine of x');
	equal(MathLib.sin(-Math.PI / 2), -1, 'Spec. 6: otherwise MathLib.sin(x) = sine of x');
});