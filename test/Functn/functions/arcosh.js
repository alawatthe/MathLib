test('.arcosh()', 9, function () {
	// Spec. 1: MathLib.arcosh(NaN) = NaN
	equal(MathLib.isNaN(MathLib.arcosh(NaN)), true, 'Spec. 1: MathLib.arcosh(NaN) = NaN');

	// Spec. 2: MathLib.arcosh(+∞) = +∞
	equal(MathLib.arcosh(+Infinity), Infinity, 'Spec. 2: MathLib.arcosh(+∞) = +∞');

	// Spec. 3: MathLib.arcosh(-∞) = NaN
	equal(MathLib.isNaN(MathLib.arcosh(-Infinity)), true, 'Spec. 3: MathLib.arcosh(-∞) = NaN');

	// Spec. 4: MathLib.arcosh(x) = NaN if x < 1
	equal(MathLib.isNaN(MathLib.arcosh(-1)), true, 'Spec. 4: otherwise MathLib.arcosh(x) = NaN if x < 1');
	equal(MathLib.isNaN(MathLib.arcosh(-0)), true, 'Spec. 4: otherwise MathLib.arcosh(x) = NaN if x < 1');
	equal(MathLib.isNaN(MathLib.arcosh(+0)), true, 'Spec. 4: otherwise MathLib.arcosh(x) = NaN if x < 1');

	// Spec. 5: MathLib.arcosh(1) = +0
	equal(MathLib.isPosZero(MathLib.arcosh(1)), true, 'Spec. 5: otherwise MathLib.arcosh(1) = +0');

	// Spec. 6: otherwise MathLib.arcosh(x) = inverse hyperbolic cosine of x
	equal(MathLib.arcosh(2), 1.3169578969248166, 'Spec. 6: otherwise MathLib.arcosh(x) = inverse hyperbolic cosine of x');
	equal(MathLib.arcosh(10), 2.993222846126381, 'Spec. 6: otherwise MathLib.arcosh(x) = inverse hyperbolic cosine of x');
});