test('.isIdentity()', 4, function () {
	var m = new MathLib.Matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]),
			n = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [2, 5, 8]]),
			o = new MathLib.Matrix([[1, 0, 0], [0, 1, 0]]);

	equal(m.isIdentity(), true, '.isIdentity() on identity matrix');
	equal(m.isIdentity(), true, '.isIdentity() should be cached');
	equal(n.isIdentity(), false, '.isIdentity() on non identity matrix');
	equal(o.isIdentity(), false, '.isIdentity() on non square matrix');
});