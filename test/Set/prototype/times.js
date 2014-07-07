test('.times()', 1, function () {
	var s = new MathLib.Set([1, 2, 3, 4]);

	ok(s.times(2).isEqual(new MathLib.Set([2, 4, 6, 8])), 'Testing .times(int) (set)');
});
