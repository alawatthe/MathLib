test('.toPoint()', 3, function () {
	var c = new MathLib.Complex(3, -4),
			p = c.toPoint();
	equal(p.type, 'point', 'Converting a complex number to a point: type check');
	equal(p.dim, 2, 'Converting a complex number to a point: dimension check.');
	deepEqual(p, new MathLib.Point([3, -4, 1]), 'Converting a complex number to a point: position check.');
});