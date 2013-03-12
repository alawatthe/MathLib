test('.isFinite()', 2, function () {
	var c = new MathLib.Complex(3, 4),
			d = new MathLib.Complex(Infinity, 0);
	equal(c.isFinite(), true, 'finite complex number');
	equal(d.isFinite(), false, 'infinte complex number');
});