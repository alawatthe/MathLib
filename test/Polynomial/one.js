test('one()', 1, function () {
	var p = MathLib.Polynomial.one;
	deepEqual(p, new MathLib.Polynomial([1]), 'Testing .one');
});