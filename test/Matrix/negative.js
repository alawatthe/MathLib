test('.negative()', 1, function () {
	var m = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [3, 6, 9]]),
			res = new MathLib.Matrix([[-1, -4, -7], [-2, -5, -8], [-3, -6, -9]]);
	deepEqual(m.negative(), res, 'negative of a simple matrix');
});