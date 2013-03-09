test('.arsinh()', 7, function () {
	// Spec. 1: MathLib.arsinh(NaN) = NaN
	equal(MathLib.isNaN(MathLib.arsinh(NaN)), true, 'Spec. 1: MathLib.arsinh(NaN) = NaN');

	// Spec. 2: MathLib.arsinh(+0) = +0
	equal(MathLib.isPosZero(MathLib.arsinh(+0)), true, 'Spec. 2: MathLib.arsinh(+0) = +0');

	// Spec. 3: MathLib.arsinh(-0) = -0
	equal(MathLib.isNegZero(MathLib.arsinh(-0)), true, 'Spec. 3: MathLib.arsinh(-0) = -0');

	// Spec. 4: MathLib.arsinh(+&infin;) = +&infin;
	equal(MathLib.arsinh(+Infinity), +Infinity, 'Spec. 4: MathLib.arsinh(+&infin;) = +&infin;');

	// Spec. 5: MathLib.arsinh(-&infin;) = -&infin;
	equal(MathLib.arsinh(-Infinity), -Infinity, 'Spec. 5: MathLib.arsinh(-&infin;) = -&infin;');

	// Spec. 6: otherwise MathLib.arsinh(x) = inverse hyperbolic sine of x
	equal(MathLib.arsinh(1), 0.8813735870195429, 'Spec. 6: otherwise MathLib.arsinh(x) = inverse hyperbolic sine of x');
	equal(MathLib.arsinh(10), 2.99822295029797, 'Spec. 6: otherwise MathLib.arsinh(x) = inverse hyperbolic sine of x');
});