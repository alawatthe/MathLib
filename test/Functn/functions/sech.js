test('.sech()', 6, function () {
	// Spec. 1: MathLib.sech(NaN) = NaN
	equal(MathLib.isNaN(MathLib.sech(NaN)), true, 'Spec. 1: MathLib.sech(NaN) = NaN');

	// Spec. 2: MathLib.sech(+∞) = +0
	equal(MathLib.isPosZero(MathLib.sech(+Infinity)), true, 'Spec. 2: MathLib.sech(+∞) = +0');

	// Spec. 3: MathLib.sech(-∞) = +0
	equal(MathLib.isPosZero(MathLib.sech(-Infinity)), true, 'Spec. 3: MathLib.sech(-∞) = +0');

	// Spec. 4: otherwise MathLib.sech(x) = hyperbolic secant of x
	equal(MathLib.sech(+0), 1, 'Spec. 4: otherwise MathLib.sech(x) = hyperbolic secant of x');
	equal(MathLib.sech(-0), 1, 'Spec. 4: otherwise MathLib.sech(x) = hyperbolic secant of x');
	equal(MathLib.isEqual(MathLib.sech(1), 0.6480542736638855), true,
		'Spec. 4: otherwise MathLib.sech(x) = hyperbolic secant of x');
});