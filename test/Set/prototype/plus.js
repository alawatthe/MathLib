test('.plus()', 2, function () {
	var s = new MathLib.Set([1, 2, 3, 4]),
			m = new MathLib.Set([1, 2, 3, 4, 5, 6]);

	ok(s.plus(2).isEqual(new MathLib.Set([3, 4, 5, 6])), 'Testing .plus(int) (set)');
	ok(s.plus(m).isEqual(new MathLib.Set([2, 3, 4, 5, 6, 7, 8, 9, 10])), 'Testing .plus(set) (set)');
});
