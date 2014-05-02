test('.sgn()', 2, function () {
	var p = new MathLib.Permutation([[0, 1], [1, 2]]),
			q = new MathLib.Permutation([[0, 1], [1, 2, 3]]);

	equal(p.sgn(), 1, 'Testing .sgn()');
	equal(q.sgn(), -1, 'Testing .sgn()');
});