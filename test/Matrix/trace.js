test('.trace()', 3, function () {
	var c = new MathLib.Complex(3, 4),
			m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
			n = new MathLib.Matrix([[1, 2], [3, c]]);

	equal(m.trace(), 15, 'trace of a simple matrix');
	equal(m.trace(), 15, 'trace should be cached now');
	deepEqual(n.trace(), new MathLib.Complex(4, 4), 'trace of a complex matrix');
});