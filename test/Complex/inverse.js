test('.inverse()', 2, function () {
	var c1 = new MathLib.Complex(3, 4),
			c2 = new MathLib.Complex(0, 2);
	deepEqual(c1.inverse(), new MathLib.Complex(3 / 25, -4 / 25), 'Checking the inverse of a complex number');
	deepEqual(c2.inverse(), new MathLib.Complex(0, -1 / 2), 'Checking the inverse of a complex number');
});