test('.toMatrix()', 2, function () {
	var c = new MathLib.Complex(3, -4);
	equal(c.toMatrix().type, 'matrix', 'type check');
	deepEqual(c.toMatrix(), new MathLib.Matrix([[3, 4], [-4, 3]]), 'entries');
});