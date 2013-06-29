test('.exp()', 6, function () {
	// Spec. 1: MathLib.exp(NaN) = NaN
	equal(MathLib.isNaN(MathLib.exp(NaN)), true, 'Spec. 1: MathLib.exp(NaN) = NaN');

	// Spec. 2: MathLib.exp(+∞) = +∞
	equal(MathLib.exp(+Infinity), +Infinity, 'Spec. 2: MathLib.exp(+∞) = +∞');

	// Spec. 3: MathLib.exp(-∞) = +0
	equal(MathLib.isPosZero(MathLib.exp(-Infinity)), true, 'Spec. 3: MathLib.exp(-∞) = 0');

	// Spec. 4: otherwise MathLib.exp(x) = e^x
	equal(MathLib.exp(+0), 1, 'Spec. 4: otherwise MathLib.exp(x) = e^x');
	equal(MathLib.exp(-0), 1, 'Spec. 4: otherwise MathLib.exp(x) = e^x');
	equal(MathLib.isEqual(MathLib.exp(1), Math.E), true, 'Spec. 4: otherwise MathLib.exp(x) = e^x');
});