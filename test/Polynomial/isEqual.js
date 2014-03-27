test('.isEqual()', 3, function () {
	var c = new MathLib.Complex(0, 0),
			p1 = new MathLib.Polynomial(3),
			p2 = new MathLib.Polynomial([c, 0, 0, 1]),
			p3 = new MathLib.Polynomial([1, 2, 3]),
			p4 = new MathLib.Polynomial([0, 0, 0, 2]);

	equal(p1.isEqual(p2), true);
	equal(p1.isEqual(p3), false);
	equal(p1.isEqual(p4), false);
});