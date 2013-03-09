test('.sign()', 7, function () {
	// Spec. 1: MathLib.sign(NaN) = NaN
	equal(MathLib.isNaN(MathLib.sign(NaN)), true, 'Spec. 1: MathLib.sign(NaN) = NaN');

	// Spec. 2: MathLib.sign(0) = 0
	equal(MathLib.isPosZero(MathLib.sign(0)), true, 'Spec. 2: MathLib.sign(0) = 0');

	// Spec. 3: MathLib.sign(-0) = -0
	equal(MathLib.isNegZero(MathLib.sign(-0)), true, 'Spec. 3: MathLib.sign(-0) = -0');

	// Spec. 4: MathLib.sign(x) = 1 for x > 0
	equal(MathLib.sign(4), 1, 'Spec. 4: MathLib.sign(x) = 1 for x > 0');
	equal(MathLib.sign(Infinity), 1, 'Spec. 4: MathLib.sign(x) = 1 for x > 0');

	// Spec. 5: MathLib.sign(x) = -1 for x < 0
	equal(MathLib.sign(-4), -1, 'Spec. 5: MathLib.sign(x) = -1 for x < 0');
	equal(MathLib.sign(-Infinity), -1, 'Spec. 5: MathLib.sign(x) = -1 for x < 0');
});