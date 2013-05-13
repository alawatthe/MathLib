test('.isSubsetOf()', 2, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
			m = new MathLib.Set([3, 8, 2]),
			n = new MathLib.Set([5, 8, 2]);

	equal(m.isSubsetOf(s), true, 'Testing .isSubsetOf()');
	equal(n.isSubsetOf(s), false, 'Testing .isSubsetOf()');
});