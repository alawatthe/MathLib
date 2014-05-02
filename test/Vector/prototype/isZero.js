test('.isZero()', 2, function () {
	var v = new MathLib.Vector([0, 0, 0]),
			w = new MathLib.Vector([0, 0, 1]);

	equal(v.isZero(), true, '.isZero()');
	equal(w.isZero(), false, '.isZero()');
});