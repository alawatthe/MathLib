test('.arccot()', 6, function () {
	// Spec. 1: MathLib.arccot(NaN) = NaN
	equal(MathLib.isNaN(MathLib.arccot(NaN)), true, 'Spec. 1: MathLib.arccot(NaN) = NaN');

	// Spec. 2: MathLib.arccot(+&infin;) = +0
	equal(MathLib.isPosZero(MathLib.arccot(+Infinity)), true, 'Spec. 2: MathLib.arccot(+&infin;) = +0');

	// Spec. 3: MathLib.arccot(-&infin;) = &pi;
	equal(MathLib.arccot(-Infinity), Math.PI, 'Spec. 3: MathLib.arccot(-&infin;) = &pi;');

	// Spec. 4: otherwise MathLib.arccot(x) = inverse cotangent of x
	equal(MathLib.arccot(1), Math.PI / 4, 'Spec. 4: otherwise MathLib.arccot(x) = inverse cotangent of x');
	equal(MathLib.arccot(-0), Math.PI / 2, 'Spec. 4: otherwise MathLib.arccot(x) = inverse cotangent of x');
	equal(MathLib.arccot(+0), Math.PI / 2, 'Spec. 4: otherwise MathLib.arccot(x) = inverse cotangent of x');
});