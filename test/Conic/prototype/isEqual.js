test('.isEqual()', 5, function () {
	var m = new MathLib.Matrix([[2, 1, 0], [1, 3, 0], [0, 0, 1]]),
			cm1 = new MathLib.Conic(m),
			cm2 = new MathLib.Conic(m),
			c1 = new MathLib.Conic([[1, 0, 0], [0, 1, 0], [0, 0, 1]]),
			c2 = new MathLib.Conic([[1, 0, 0], [0, 1, 0], [0, 0, 1]]),
			c3 = new MathLib.Conic([[2, 0, 0], [0, 2, 0], [0, 0, 2]]),
			c4 = new MathLib.Conic([[1, 0, 0], [0, 1, 0], [0, 0, 2]]);

	equal(cm1.isEqual(cm2), true, 'same matrix variable');
	equal(c1.isEqual(c1), true, 'same variable');
	equal(c1.isEqual(c2), true, 'identical conic');
	equal(c1.isEqual(c3), true, 'scaled parameters');
	equal(c1.isEqual(c4), false, 'different conic');
});