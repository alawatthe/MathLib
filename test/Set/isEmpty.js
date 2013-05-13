test('.isEmpty()', 3, function () {
	var m = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
			n = new MathLib.Set(),
			o = new MathLib.Set([]);
	equal(m.isEmpty(), false, 'Testing .min()');
	equal(n.isEmpty(), true, 'Testing .min(3)');
	equal(o.isEmpty(), true, 'Testing .min(3)');
});