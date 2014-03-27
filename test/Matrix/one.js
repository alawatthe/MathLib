test('.one()', 3, function () {
	var m = MathLib.Matrix.one(),
			n = MathLib.Matrix.one(2),
			o = MathLib.Matrix.one(2, 3);

	ok(m.isEqual(new MathLib.Matrix([[1]])));
	ok(n.isEqual(new MathLib.Matrix([[1, 1], [1, 1]])));
	ok(o.isEqual(new MathLib.Matrix([[1, 1, 1], [1, 1, 1]])));
});