test('.determinant()', 4, function () {
	var m = new MathLib.Matrix([[0, 1, 2], [3, 2, 1], [1, 1, 0]]),
			n = new MathLib.Matrix([[42]]),
			p = new MathLib.Matrix([[0, 1, 2], [3, 2, 1]]);

	equal(m.determinant(), 3, 'Determinant of a 3x3 matrix');
	equal(m.determinant(), 3, 'Determinant should be cached now');
	equal(n.determinant(), 42, 'Determinant of 1x1 matrix');
	equal(p.determinant(), undefined, 'Determinant of 2x3 matrix should be undefined');
});