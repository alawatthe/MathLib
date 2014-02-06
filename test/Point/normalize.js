test('.normalize()', 2, function () {
	var p1 = new MathLib.Point([3, 2, 2]),
			p2 = new MathLib.Point([3, 2, 0]);

	deepEqual(p1.normalize(), new MathLib.Point([1.5, 1, 1]), '.normalize() of an finite point');
	deepEqual(p2.normalize(), new MathLib.Point([3, 2, 0]), '.normalize() of an infinite point');
});