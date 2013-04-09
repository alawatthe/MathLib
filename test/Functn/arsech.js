test('.arsech()', 10, function () {
	// Spec. 1: MathLib.arsech(NaN) = NaN
	equal(MathLib.isNaN(MathLib.arsech(NaN)), true, 'Spec. 1: MathLib.arsech(NaN) = NaN');

	// Spec. 2: MathLib.arsech(+0) = +Infinity
	equal(MathLib.arsech(+0), Infinity, 'Spec. 2: MathLib.arsech(+0) = +∞');

	// Spec. 3: MathLib.arsech(-0) = NaN
	equal(MathLib.isNaN(MathLib.arsech(-0)), true, 'Spec. 3: MathLib.arsech(-0) = NaN');

	// Spec. 4: MathLib.arsech(+∞) = NaN
	equal(MathLib.isNaN(MathLib.arsech(Infinity)), true, 'Spec. 4: MathLib.arsech(+∞) = NaN');

	// Spec. 5: MathLib.arsech(-∞) = NaN
	equal(MathLib.isNaN(MathLib.arsech(-Infinity)), true, 'Spec. 5: MathLib.arsech(-∞) = NaN');

	// Spec. 6: MathLib.arsech(1) = +0;
	equal(MathLib.isPosZero(MathLib.arsech(1)), true, 'Spec. 6: MathLib.arsech(1) = +0');

	// Spec. 7: MathLib.arsech(x) = NaN if x < 0 or x > 1
	equal(MathLib.isNaN(MathLib.arsech(+2)), true, 'Spec. 7: MathLib.arsech(x) = NaN if x < 0 or x > 1');
	equal(MathLib.isNaN(MathLib.arsech(-2)), true, 'Spec. 7: MathLib.arsech(x) = NaN if x < 0 or x > 1');

	// Spec. 8: otherwise MathLib.arsech(x) = inverse hyperbolic secant of x
	equal(MathLib.arsech(0.5), 1.3169578969248166, 'Spec. 8: otherwise MathLib.arsech(x) = inverse hyperbolic secant of x');
	equal(MathLib.arsech(0.75), 0.7953654612239056, 'Spec. 8: otherwise MathLib.arsech(x) = inverse hyperbolic secant of x');
});