test('.remove()', 1, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]);
	deepEqual(s.remove(3), new MathLib.Set([2, 4, 8, 9]), 'Testing .toArray()');
});