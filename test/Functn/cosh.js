test('.cosh()', 6, function () {
	// Spec. 1: MathLib.cosh(NaN) = NaN
	equal(MathLib.isNaN(MathLib.cosh(NaN)), true, 'Spec. 1: MathLib.cosh(NaN) = NaN');

	// Spec. 2: MathLib.cosh(+&infin;) = +&infin;
	equal(MathLib.cosh(+Infinity), +Infinity, 'Spec. 2: MathLib.cosh(+&infin;) = +&infin;');

	// Spec. 3: MathLib.cosh(-&infin;) = +&infin;
	equal(MathLib.cosh(-Infinity), +Infinity, 'Spec. 3: MathLib.cosh(-&infin;) = +&infin;');

	// Spec. 4: otherwise MathLib.cosh(x) = hyperbolic cosine of x
	equal(MathLib.cosh(+0), 1, 'Spec. 4: otherwise MathLib.cosh(x) = hyperbolic cosine of x');
	equal(MathLib.cosh(-0), 1, 'Spec. 4: otherwise MathLib.cosh(x) = hyperbolic cosine of x');
	equal(MathLib.cosh(1), 1.5430806348152437, 'Spec. 4: otherwise MathLib.cosh(x) = hyperbolic cosine of x');
});