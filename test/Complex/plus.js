test('.plus()', 2, function () {
	var c = new MathLib.Complex(3, 4);
	var d = new MathLib.Complex(2, -5);
	deepEqual(c.plus(d), new MathLib.Complex(5, -1), 'Adding two complex numbers.');
	deepEqual(c.plus(5), new MathLib.Complex(8, 4), 'Adding a number to a complex numbers.');
});