test('.tanh()', 7, function () {
	// Spec. 1: MathLib.tanh(NaN) = NaN
	equal(MathLib.isNaN(MathLib.tanh(NaN)), true, 'Spec. 1: MathLib.tanh(NaN) = NaN');

	// Spec. 2: MathLib.tanh(+0) = +0
	equal(MathLib.isPosZero(MathLib.tanh(+0)), true, 'Spec. 2: MathLib.tanh(+0) = +0');

	// Spec. 3: MathLib.tanh(-0) = -0
	equal(MathLib.isNegZero(MathLib.tanh(-0)), true, 'Spec. 3: MathLib.tanh(-0) = -0');

	// Spec. 4: MathLib.tanh(+∞) = 1
	equal(MathLib.tanh(+Infinity), 1, 'Spec. 4: MathLib.tanh(+∞) = +1');

	// Spec. 5: MathLib.tanh(-∞) = -1
	equal(MathLib.tanh(-Infinity), -1, 'Spec. 5: MathLib.tanh(-∞) = -1');

	// Spec. 6: otherwise MathLib.tanh(x) = hyperbolic tangent of x
	equal(MathLib.isEqual(MathLib.tanh(1), 0.761594155955765), true,
		'Spec. 6: otherwise MathLib.tanh(x) = hyperbolic tangent of x');
	equal(MathLib.isEqual(MathLib.tanh(10), 0.9999999958776927), true,
		'Spec. 6: otherwise MathLib.tanh(x) = hyperbolic tangent of x');
});