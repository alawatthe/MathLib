test('.splitDegenerated()', 4, function () {
	var c1 = new MathLib.Conic([[1, 0, 0], [0, 1, 0], [0, 0, 1]]),
			c2 = new MathLib.Conic([[1, 0, 0], [0, 1, 0], [0, 0, 0]]),
			c3 = new MathLib.Conic([[1, 1, 0], [1, 1, 0], [0, 0, 0]]),
			c4 = new MathLib.Conic([[1, 0, 0], [0, 0, 0], [0, 0, 0]]);

	equal(c1.splitDegenerated(), undefined, 'rank 3 conic');
	deepEqual(c2.splitDegenerated(), [new MathLib.Line([1, 1, 0]), new MathLib.Line([1, -1, 0])], 'rank 2 conic');
	deepEqual(c3.splitDegenerated(), [new MathLib.Line([1, 1, 0]), new MathLib.Line([1, 1, 0])], 'rank 1 conic');
	deepEqual(c4.splitDegenerated(), [new MathLib.Line([1, 0, 0]), new MathLib.Line([1, 0, 0])], 'rank 1 conic');
});