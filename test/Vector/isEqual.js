test('.isEqual()', 3, function () {
	var v = new MathLib.Vector([0, 1, 2]),
			w = new MathLib.Vector([0, 1, 2]),
			u = new MathLib.Vector([0, 0, 0]),
			x = new MathLib.Vector([0, 0, 0, 0]);

	equal(v.isEqual(w), true, '.isEqual()');
	equal(v.isEqual(u), false, '.isEqual()');
	equal(u.isEqual(x), false, '.isEqual()');
});