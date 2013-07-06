test('identity()', 1, function () {
	equal(new MathLib.Matrix.identity(4).isIdentity(), true, 'creating a identity matrix');
});