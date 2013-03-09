test('.times()', 5, function () {
	equal(MathLib.times(), 1, 'The empty product is one.');
	equal(MathLib.times([]), 1, 'The empty product is one.');
	equal(MathLib.times(1, 2), 2);
	equal(MathLib.times([1, 2]), 2);
	deepEqual(MathLib.times(MathLib.Matrix.identity(3), MathLib.Matrix.identity(3)),
		new MathLib.Matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]));
});