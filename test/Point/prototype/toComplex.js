test('.toComplex()', 2, function () {
	var p1 = new MathLib.Point([3, 2, 1]),
			p2 = new MathLib.Point([3, 2, 0]);

	deepEqual(p1.toComplex(), new MathLib.Complex(3, 2), '.toComplex() of an finite point');
	equal(p2.toComplex().re, Infinity, '.toComplex() of an infinite point');
});