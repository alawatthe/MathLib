test('.isEqual()', 4, function () {
	var c = new MathLib.Complex(6, 7),
			m = new MathLib.Matrix([[1, 2, 3], [4, 5, c], [8, 9, 10]]),
			n = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 10]]),
			o = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 10]]),
			p = new MathLib.Matrix([[1, 2, 3], [4, 5, 6]]);

	equal(m.isEqual(m), true);
	equal(n.isEqual(o), true);
	equal(o.isEqual(p), false);
	equal(m.isEqual(n), false);
});