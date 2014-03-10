test('.tan()', 7, function () {
	// Spec. 1: MathLib.tan(NaN) = NaN
	equal(MathLib.isNaN(MathLib.tan(NaN)), true, 'Spec. 1: MathLib.tan(NaN) = NaN');

	// Spec. 2: MathLib.tan(+0) = +0
	equal(MathLib.isPosZero(MathLib.tan(+0)), true, 'Spec. 2: MathLib.tan(+0) = +0');

	// Spec. 3: MathLib.tan(-0) = -0
	equal(MathLib.isNegZero(MathLib.tan(-0)), true, 'Spec. 3: MathLib.tan(-0) = -0');

	// Spec. 4: MathLib.tan(+∞) = NaN
	equal(MathLib.isNaN(MathLib.tan(+Infinity)), true, 'Spec. 4: MathLib.tan(+∞) = NaN');

	// Spec. 5: MathLib.tan(-∞) = NaN
	equal(MathLib.isNaN(MathLib.tan(-Infinity)), true, 'Spec. 5: MathLib.tan(-∞) = NaN');

	// Spec. 6: otherwise MathLib.tan(x) = tangent of x
	equal(MathLib.isZero(MathLib.tan(Math.PI)), true, 'Spec. 6: otherwise MathLib.tan(x) = tangent of x');
	equal(MathLib.isOne(MathLib.tan(Math.PI / 4)), true, 'Spec. 6: otherwise MathLib.tan(x) = tangent of x');
});