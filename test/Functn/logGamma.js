test('.logGamma()', 8, function () {
	// Spec. 1: MathLib.logGamma(NaN) = NaN
	equal(MathLib.isNaN(MathLib.logGamma(NaN)), true, 'Spec. 1: MathLib.logGamma(NaN) = NaN');

	// Spec. 2: MathLib.logGamma(+0) = +∞
	equal(MathLib.logGamma(+0), Infinity, 'Spec. 2: MathLib.logGamma(+0) = +∞');

	// Spec. 3: MathLib.logGamma(-0) = NaN
	equal(MathLib.isNaN(MathLib.logGamma(-0)), true, 'Spec. 3: MathLib.logGamma(-0) = NaN');

	// Spec. 4: MathLib.logGamma(+∞) = +∞
	equal(MathLib.logGamma(+Infinity), +Infinity, 'Spec. 4: MathLib.logGamma(+∞) = +∞');

	// Spec. 5: MathLib.logGamma(-∞) = NaN
	equal(MathLib.isNaN(MathLib.logGamma(-Infinity)), true, 'Spec. 5: MathLib.logGamma(-∞) = NaN');

	// Spec. 6: MathLib.logGamma(x) = NaN (if x < 0)
	equal(MathLib.isNaN(MathLib.logGamma(-8)), true, 'Spec. 6: MathLib.logGamma(x) = NaN (if x < 0)');

	// Spec. 7: otherwise MathLib.logGamma(x) = logarithm of the gamma function of x
	equal(MathLib.logGamma(8), 8.5251613610654143002, 'Spec. 7: otherwise MathLib.logGamma(x) = logarithm of the gamma function of x');
	equal(MathLib.logGamma(10000), 82099.717496442377273, 'Spec. 7: otherwise MathLib.logGamma(x) = logarithm of the gamma function of x');
});