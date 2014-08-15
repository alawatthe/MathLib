test('.toString()', 3, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
			e = new MathLib.Set();

	equal(s.toString(), '{2, 3, 4, 8, 9}', 'Testing .toString() (set)');
	equal(s.toString({base: 2}), '{10, 11, 100, 1000, 1001}', 'Testing .toString() (set)');
	equal(e.toString(), '∅', 'Testing .toString() (empty set)');
});
