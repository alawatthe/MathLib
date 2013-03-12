test('.arg()', 4, function () {
	var c1 = new MathLib.Complex(1, 1),
			c2 = new MathLib.Complex(1, -1),
			c3 = new MathLib.Complex(0, 0),
			c4 = new MathLib.Complex(-1, 0);

	equal(c1.arg(), 0.7853981633974483, '');
	equal(c2.arg(), -0.7853981633974483, '');
	equal(c3.arg(), 0,  '');
	equal(c4.arg(), 3.141592653589793,  '');
});