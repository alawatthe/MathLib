test('.conjugate()', 2, function () {
	var c = new MathLib.Complex(3, 4);
	c = c.conjugate();
	equal(c.re, 3, 'Checking the conjugate of a complex number');
	equal(c.im, -4, 'Checking the conjugate of a complex number');
});