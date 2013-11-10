test('.isFinite()', 3, function () {
	equal((new MathLib.Complex(3, 4)).isFinite(), true, 'finite complex number');
	equal((new MathLib.Complex(Infinity)).isFinite(), false, 'ComplexInfinity');
	equal((new MathLib.Complex(NaN)).isFinite(), false, 'ComplexNaN');
});