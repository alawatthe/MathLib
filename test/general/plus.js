test('.plus()', 5, function () {
	equal(MathLib.plus(), 0, 'The empty sum is zero.');
	equal(MathLib.plus([]), 0, 'The empty sum is zero.');
	equal(MathLib.plus(1, 2), 3);
	equal(MathLib.plus([1, 2]), 3);
	deepEqual(MathLib.plus(MathLib.Matrix.identity(3), MathLib.Matrix.identity(3)),
		new MathLib.Matrix([[2, 0, 0], [0, 2, 0], [0, 0, 2]]));
});