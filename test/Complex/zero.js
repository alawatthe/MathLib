test('zero', 1, function () {
	var c = MathLib.Complex.zero;
	deepEqual(c, new MathLib.Complex(0, 0), '.zero');
});
