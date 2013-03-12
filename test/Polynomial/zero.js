test('zero()', 1, function () {
	var p = MathLib.Polynomial.zero;
	deepEqual(p, new MathLib.Polynomial([0]), 'Testing .zero');
});