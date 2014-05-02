test('.without()', 2, function () {
	var s = new MathLib.Set([1, 2, 3, 4]),
			m = new MathLib.Set([1, 3, 5, 7]),
			c1 = new MathLib.Set([1, new MathLib.Complex(1, 1), new MathLib.Complex(0, 1), 2]),
			c2 = new MathLib.Set([1, new MathLib.Complex(1, 1), new MathLib.Complex(0, 2), 3]);

	ok(s.without(m).isEqual(new MathLib.Set([2, 4])), '.without()');
	ok(c1.without(c2).isEqual(new MathLib.Set([2, new MathLib.Complex(0, 1)])), '.without()');
});