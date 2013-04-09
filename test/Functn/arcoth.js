test('.arcoth()', 11, function () {
	// Spec. 1: MathLib.arcoth(NaN) = NaN
	equal(MathLib.isNaN(MathLib.arcoth(NaN)), true, 'Spec. 1: MathLib.arcoth(NaN) = NaN');

	// Spec. 2: MathLib.arcoth(+∞) = +0
	equal(MathLib.isPosZero(MathLib.arcoth(Infinity)), true, 'Spec. 2: MathLib.arcoth(+∞) = +0');

	// Spec. 3: MathLib.arcoth(-∞) = -0
	equal(MathLib.isNegZero(MathLib.arcoth(-Infinity)), true, 'Spec. 3: MathLib.arcoth(-∞) = -0');

	// Spec. 4: MathLib.arcoth(1) = +∞
	equal(MathLib.arcoth(1), Infinity, 'Spec. 4: MathLib.arcoth(1) = +∞');

	// Spec. 5: MathLib.arcoth(-1) = -∞
	equal(MathLib.arcoth(-1), -Infinity, 'Spec. 5: MathLib.arcoth(-1) = -∞');

	// Spec. 6: MathLib.arcoth(x) = NaN if x > -1 and x < 1
	equal(MathLib.isNaN(MathLib.arcoth(+0)), true, 'Spec. 6: MathLib.arcoth(x) = NaN if x > -1 and x < 1');
	equal(MathLib.isNaN(MathLib.arcoth(-0)), true, 'Spec. 6: MathLib.arcoth(x) = NaN if x > -1 and x < 1');
	equal(MathLib.isNaN(MathLib.arcoth(+0.5)), true, 'Spec. 6: MathLib.arcoth(x) = NaN if x > -1 and x < 1');
	equal(MathLib.isNaN(MathLib.arcoth(-0.5)), true, 'Spec. 6: MathLib.arcoth(x) = NaN if x > -1 and x < 1');

	// Spec. 7: otherwise MathLib.arcoth(x) = inverse hyperbolic cotangent of x
	equal(MathLib.arcoth(2), 0.5493061443340549, 'Spec. 9: otherwise MathLib.arcoth(x) = inverse hyperbolic cotangent of x');
	equal(MathLib.arcoth(10), 0.10033534773107562, 'Spec. 9: otherwise MathLib.arcoth(x) = inverse hyperbolic cotangent of x');
});