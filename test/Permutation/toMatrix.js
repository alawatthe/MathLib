test('.toMatrix()', 2, function () {
	var p = new MathLib.Permutation([[0, 1], [2, 3]]),
			q = new MathLib.Permutation([]),
			pm = new MathLib.Matrix([[0, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0]]),
			qm = new MathLib.Matrix([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);

	deepEqual(p.toMatrix(), pm, 'Testing .toMatrix()');
	deepEqual(q.toMatrix(4), qm, 'Testing .toMatrix() with id permutation');
});