test('.coth()', 7, function () {
	// Spec. 1: MathLib.coth(NaN) = NaN
	equal(MathLib.isNaN(MathLib.coth(NaN)), true, 'Spec. 1: MathLib.coth(NaN) = NaN');

	// Spec. 2: MathLib.coth(+0) = +∞
	equal(MathLib.coth(+0), Infinity, 'Spec. 2: MathLib.coth(+0) = +∞');

	// Spec. 3: MathLib.coth(-0) = -∞
	equal(MathLib.coth(-0), -Infinity, 'Spec. 3: MathLib.coth(-0) = -∞');

	// Spec. 4: MathLib.coth(+∞) = 1
	equal(MathLib.coth(+Infinity), 1, 'Spec. 4: MathLib.coth(+∞) = 1');

	// Spec. 5: MathLib.coth(-∞) = -1
	equal(MathLib.coth(-Infinity), -1, 'Spec. 5: MathLib.coth(-∞) = -1');

	// Spec. 6: otherwise MathLib.coth(x) = hyperbolic cotangent of x
	equal(MathLib.coth(1), 1.3130352854993313, 'Spec. 6: otherwise MathLib.coth(x) = hyperbolic cotangent of x');
	equal(MathLib.coth(10), 1.0000000041223073, 'Spec. 6: otherwise MathLib.coth(x) = hyperbolic cotangent of x');
});