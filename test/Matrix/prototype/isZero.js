test('.isZero()', 3, function () {
	var c = new MathLib.Complex(0, 0),
			m = new MathLib.Matrix([[0, 0, 0], [0, 0, c], [0, 0, 0]]),
			n = new MathLib.Matrix([[0, 0, 0], [0, 1, c], [0, 0, 0]]);

	equal(m.isZero(), true, 'zero matrix');
	equal(m.isZero(), true, '.isZero() should be cached now');
	equal(n.isZero(), false, 'non zero matrix');
});