test('.distanceTo()', 2, function () {
	var p1 = new MathLib.Point([6, 8, 2]),
			p2 = new MathLib.Point([-3, 4, 1]);

	deepEqual(p1.distanceTo(), 5, '.distanceTo()');
	deepEqual(p1.distanceTo(p2), 6, '.distanceTo()');
});