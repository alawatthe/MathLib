test('.zero()', 3, function () {
	var m = MathLib.Matrix.zero(),
			n = MathLib.Matrix.zero(2),
			o = MathLib.Matrix.zero(2, 3);

	ok(m.isEqual(new MathLib.Matrix([[0]])));
	ok(n.isEqual(new MathLib.Matrix([[0, 0], [0, 0]])));
	ok(o.isEqual(new MathLib.Matrix([[0, 0, 0], [0, 0, 0]])));
});