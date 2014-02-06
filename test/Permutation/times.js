test('.times()', 1, function () {
	var p = new MathLib.Permutation([2, 0, 1]),
			q = new MathLib.Permutation([0, 2, 1]);

	deepEqual(p.times(q), new MathLib.Permutation([2, 1, 0]), 'Testing .times()');
});