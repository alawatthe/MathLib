test('.toString()', 2, function () {
	var p = new MathLib.Permutation([[0, 1], [2, 3]]),
			q = new MathLib.Permutation([]);

	equal(p.toString(), '(0,1)(2,3)', 'Testing .toString()');
	equal(q.toString(), '', 'Testing .toString() with id permutation');
});