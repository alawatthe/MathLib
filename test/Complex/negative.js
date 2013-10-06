test('.negative()', 2, function () {
	var c = new MathLib.Complex(3, -4);
	c = c.negative();
	equal(c.re, -3, 'Checking the negative of a complex number');
	equal(c.im, 4, 'Checking the negative of a complex number');
});