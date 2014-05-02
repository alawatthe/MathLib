test('.times()', 2, function () {
	var s = new MathLib.Set([1, 2, 3, 4]);

	equal(s.times(), 24, 'Testing .times() (set)');
	ok(s.times(2).isEqual(new MathLib.Set([2, 4, 6, 8])), 'Testing .times(int) (set)');
});