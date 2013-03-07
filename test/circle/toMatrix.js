test('.toMatrix()', 1, function () {
	var p = new MathLib.Point(1, 2),
			c = new MathLib.Circle(p, 2);

	deepEqual(c.toMatrix(), new MathLib.Matrix([[1, 0, -1], [0, 1, -2], [-1, -2, 1]]), '');
});