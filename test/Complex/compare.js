test('.compare()', 9, function () {
	var c = new MathLib.Complex(3, 2),
			d = new MathLib.Complex(1, 1),
			e = new MathLib.Complex(-1, 1),
			nan = new MathLib.Complex(NaN),
			inf = new MathLib.Complex(Infinity);

	equal(nan.compare(nan), 0);
	equal(nan.compare(c), -1);
	equal(nan.compare(inf), -1);

	equal(inf.compare(nan), 1);
	equal(inf.compare(c), 1);
	equal(inf.compare(inf), 0);

	equal(c.compare(c), 0, 'equal complex numbers');
	equal(c.compare(d), 1, 'normal compare');
	equal(d.compare(e), -1,  '');
});