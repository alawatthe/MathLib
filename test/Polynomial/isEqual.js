test('.isEqual()', 1, function () {
	var c = new MathLib.Complex(0, 0),
			p = new MathLib.Polynomial(3),
			q = new MathLib.Polynomial([c, 0, 0, 1]);
	equal(q.isEqual(p), true, '.times(polynomial)');
});