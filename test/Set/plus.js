test('.plus()', 3, function () {
	var s = new MathLib.Set([1, 2, 3, 4]),
			m = new MathLib.Set([1, 2, 3, 4, 5, 6]);
	equal(s.plus(), 10, 'Testing .plus() (set)');
	deepEqual(s.plus(2), new MathLib.Set([3, 4, 5, 6]), 'Testing .plus(int) (set)');
	deepEqual(s.plus(m), new MathLib.Set([2, 3, 4, 5, 6, 7, 8, 9, 10]), 'Testing .plus(set) (set)');
});