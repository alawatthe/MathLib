test('.cholesky()', 1, function () {
	var m = new MathLib.Matrix([[25, 15, -5], [15, 18, 0], [-5, 0, 11]]),
			res = new MathLib.Matrix([[5, 0, 0], [3, 3, 0], [-1, 1, 3]]);

	deepEqual(m.cholesky(), res, 'Cholesky decomposition of a 3x3 matrix');
});