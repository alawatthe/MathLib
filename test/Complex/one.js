test('one', 1, function () {
	var c = MathLib.Complex.one;
	deepEqual(c, new MathLib.Complex(1, 0), '.one');
});