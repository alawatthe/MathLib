test('cycleToList()', 2, function () {
	var p = [[0, 1, 2], [3, 4]],
			q = [[0, 1], [2, 3]];

	deepEqual(new MathLib.Permutation.cycleToList(p), [1, 2, 0, 4, 3], 'Testing .cycleToList()');
	deepEqual(new MathLib.Permutation.cycleToList(q), [1, 0, 3, 2], 'Testing .cycleToList()');
});