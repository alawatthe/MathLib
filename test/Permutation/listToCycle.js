test('listToCycle()', 1, function () {
	var p = [1, 2, 0, 4, 3];
	deepEqual(new MathLib.Permutation.listToCycle(p), [[0, 1, 2], [3, 4]], 'Testing .listToCycle()');
});