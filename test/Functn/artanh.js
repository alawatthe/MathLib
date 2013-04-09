test('.artanh()', 11, function () {
	// Spec. 1: MathLib.artanh(NaN) = NaN
	equal(MathLib.isNaN(MathLib.artanh(NaN)), true, 'Spec. 1: MathLib.artanh(NaN) = NaN');

	// Spec. 2: MathLib.artanh(+0) = +0
	equal(MathLib.isPosZero(MathLib.artanh(+0)), true, 'Spec. 2: MathLib.artanh(+0) = +0');

	// Spec. 3: MathLib.artanh(-0) = -0
	equal(MathLib.isNegZero(MathLib.artanh(-0)), true, 'Spec. 3: MathLib.artanh(-0) = -0');

	// Spec. 4: MathLib.artanh(+∞) = NaN
	equal(MathLib.isNaN(MathLib.artanh(Infinity)), true, 'Spec. 4: MathLib.artanh(+∞) = NaN');

	// Spec. 5: MathLib.artanh(-∞) = NaN
	equal(MathLib.isNaN(MathLib.artanh(-Infinity)), true, 'Spec. 5: MathLib.artanh(-∞) = NaN');

	// Spec. 6: MathLib.artanh(1) = +∞
	equal(MathLib.artanh(1), Infinity, 'Spec. 6: MathLib.artanh(1) = +∞');

	// Spec. 7: MathLib.artanh(-1) = -∞
	equal(MathLib.artanh(-1), -Infinity, 'Spec. 7: MathLib.artanh(-1) = -∞');

	// Spec. 8: MathLib.artanh(x) = NaN if x < -1 or x > 1
	equal(MathLib.isNaN(MathLib.artanh(+2)), true, 'Spec. 8: MathLib.artanh(x) = NaN if x < -1 or x > 1');
	equal(MathLib.isNaN(MathLib.artanh(-2)), true, 'Spec. 8: MathLib.artanh(x) = NaN if x < -1 or x > 1');

	// Spec. 9: otherwise MathLib.artanh(x) = inverse hyperbolic tangent of x
	equal(MathLib.artanh(0.5), 0.5493061443340549, 'Spec. 9: otherwise MathLib.artanh(x) = inverse hyperbolic tangent of x');
	equal(MathLib.artanh(0.75), 0.9729550745276566, 'Spec. 9: otherwise MathLib.artanh(x) = inverse hyperbolic tangent of x');
});