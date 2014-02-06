test('.reflectAt()', 1, function () {
	var point1 = new MathLib.Point([0, 0, 1]),
			point2 = new MathLib.Point([1, 2, 1]),
			point3 = new MathLib.Point([2, 4, 1]);

	deepEqual(point1.reflectAt(point2), point3, '.reflectAt()');
});