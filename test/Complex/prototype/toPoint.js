test('.toPoint()', 5, function () {
	var c = new MathLib.Complex(3, -4),
			p = c.toPoint();

	equal(p.type, 'point', 'Converting a complex number to a point: type check');
	equal(p.dimension, 2, 'Converting a complex number to a point: dimension check.');
	deepEqual(p, new MathLib.Point([3, -4, 1]), 'Converting a complex number to a point: position check.');

	ok((new MathLib.Complex(NaN)).toPoint().isEqual(new MathLib.Point([0, 0, 0])), 'ComplexNaN.toPoint() = (0,0,0)');
	ok((new MathLib.Complex(Infinity)).toPoint().isEqual(new MathLib.Point([0, 0, 0])), 'ComplexInfinity.toPoint() = (0,0,0)');
});