test('.compare()', 3, function () {
	var v1 = new MathLib.Vector([1, 2]),
			v2 = new MathLib.Vector([1, 2, 3]),
			v3 = new MathLib.Vector([1, 2, 3]),
			v4 = new MathLib.Vector([1, 2, 1]);

	equal(v1.compare(v2), -1);
	equal(v2.compare(v3), 0);
	equal(v3.compare(v4), 1);
});