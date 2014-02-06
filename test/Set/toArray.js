test('.toArray()', 2, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
			n = new MathLib.Set();

	deepEqual(s.toArray(), [2, 3, 4, 8, 9], 'Testing .toArray() (set)');
	deepEqual(n.toArray(), [], 'Testing .toArray() (empty set)');
});