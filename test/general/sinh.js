test('.sinh()', 7, function () {
	// Spec. 1: MathLib.sinh(NaN) = NaN
	equal(MathLib.isNaN(MathLib.sinh(NaN)), true, 'Spec. 1: MathLib.sinh(NaN) = NaN');

	// Spec. 2: MathLib.sinh(+0) = +0
	equal(MathLib.isPosZero(MathLib.sinh(+0)), true, 'Spec. 2: MathLib.sinh(+0) = +0');

	// Spec. 3: MathLib.sinh(-0) = -0
	equal(MathLib.isNegZero(MathLib.sinh(-0)), true, 'Spec. 3: MathLib.sinh(-0) = -0');

	// Spec. 4: MathLib.sinh(+&infin;) = +&infin;
	equal(MathLib.sinh(+Infinity), +Infinity, 'Spec. 4: MathLib.sinh(+&infin;) = +&infin;');

	// Spec. 5: MathLib.sinh(-&infin;) = -&infin;
	equal(MathLib.sinh(-Infinity), -Infinity, 'Spec. 5: MathLib.sinh(-&infin;) = -&infin;');

	// Spec. 6: otherwise MathLib.sinh(x) = hyperbolic sine of x
	equal(MathLib.sinh(1), 1.1752011936438014, 'Spec. 6: otherwise MathLib.sinh(x) = hyperbolic sine of x');
	equal(MathLib.sinh(10), 11013.232874703393, 'Spec. 6: otherwise MathLib.sinh(x) = hyperbolic sine of x');
});