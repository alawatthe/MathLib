test('.isEqual()', 4, function () {
	var c1 = new MathLib.Conic([[1, 0, 0], [0, 1, 0], [0, 0, 1]]),
			c2 = new MathLib.Conic([[1, 0, 0], [0, 1, 0], [0, 0, 1]]),
			c3 = new MathLib.Conic([[2, 0, 0], [0, 2, 0], [0, 0, 2]]),
			c4 = new MathLib.Conic([[1, 0, 0], [0, 1, 0], [0, 0, 2]]);


	equal(c1.isEqual(c1), true, 'same variable');
	equal(c1.isEqual(c2), true, 'identical conic');
	equal(c1.isEqual(c3), true, 'scaled parameters');
	equal(c1.isEqual(c4), false, 'different conic');
});