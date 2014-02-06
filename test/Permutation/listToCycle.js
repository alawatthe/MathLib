test('listToCycle()', 1, function () {
	deepEqual(new MathLib.Permutation.listToCycle([1, 2, 0, 4, 3]), [[0, 1, 2], [3, 4]], 'Testing .listToCycle()');
});