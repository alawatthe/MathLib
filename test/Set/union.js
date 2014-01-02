test('.union()', 2, function () {
	var s = new MathLib.Set([1, 2, 3, 4]),
			m = new MathLib.Set([1, 3, 5, 7]),
			c = new MathLib.Set([1, new MathLib.Complex(1, 1), new MathLib.Complex(0, 1), 3]);

	ok(s.union(m).isEqual(new MathLib.Set([1, 2, 3, 4, 5, 7])), '.union()');
	ok(s.union(c).isEqual(new MathLib.Set([1, 2, 3, 4, new MathLib.Complex(0, 1), new MathLib.Complex(1, 1)])), '.union()');
});