test('.arccsc()', 9, function () {
	// Spec. 1: MathLib.arccsc(NaN) = NaN
	equal(MathLib.isNaN(MathLib.arccsc(NaN)), true, 'Spec. 1: MathLib.arccsc(NaN) = NaN');

	// Spec. 2: MathLib.arccsc(x) = NaN (if -1<x<1)
	equal(MathLib.isNaN(MathLib.arccsc(+0)), true, 'Spec. 2: MathLib.arccsc(x) = NaN (if -1<x<1)');
	equal(MathLib.isNaN(MathLib.arccsc(-0)), true, 'Spec. 2: MathLib.arccsc(x) = NaN (if -1<x<1)');
	equal(MathLib.isNaN(MathLib.arccsc(0.5)), true, 'Spec. 2: MathLib.arccsc(x) = NaN (if -1<x<1)');

	// Spec. 3: MathLib.arccsc(+&infin;) = +0
	equal(MathLib.isPosZero(MathLib.arccsc(+Infinity)), true, 'Spec. 3: MathLib.arccsc(+&infin;) = +0');

	// Spec. 4: MathLib.arccsc(-&infin;) = -0
	equal(MathLib.isNegZero(MathLib.arccsc(-Infinity)), true, 'Spec. 4: MathLib.arccsc(-&infin;) = -0');

	// Spec. 5: otherwise MathLib.arccsc(x) = inverse cosecant of x
	equal(MathLib.arccsc(1), Math.PI / 2, 'Spec. 5: otherwise MathLib.arccsc(x) = inverse cosecant of x');
	equal(MathLib.arccsc(-1), -Math.PI / 2, 'Spec. 5: otherwise MathLib.arccsc(x) = inverse cosecant of x');
	equal(MathLib.arccsc(2), Math.PI / 6, 'Spec. 5: otherwise MathLib.arccsc(x) = inverse cosecant of x');
});