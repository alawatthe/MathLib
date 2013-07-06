test('.LU()', 2, function () {
	var m = new MathLib.Matrix([[4, 3], [8, 3]]),
			n = new MathLib.Matrix([[1, 3, 5], [2, 4, 7], [1, 1, 0]]),
			res1 = new MathLib.Matrix([[8, 3], [0.5, 1.5]]),
			res2 = new MathLib.Matrix([[2, 4, 7], [0.5, 1, 1.5], [0.5, -1, -2]]);

	deepEqual(m.LU(), res1, 'LU decomposition');
	deepEqual(n.LU(), res2, 'LU decomposition');
});