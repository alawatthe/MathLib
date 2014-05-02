test('.negative()', 1, function () {
	var p = new MathLib.Polynomial([1, 2, 3]),
			q = new MathLib.Polynomial([-1, -2, -3]);

	ok(p.negative().isEqual(q));
});