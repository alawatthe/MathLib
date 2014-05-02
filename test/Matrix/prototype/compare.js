test('.compare()', 3, function () {
	var m1 = new MathLib.Matrix([[1, 2], [3, 4]]),
			m2 = new MathLib.Matrix([[1, 2, 3], [4, 5, 6]]),
			m3 = new MathLib.Matrix([[1, 2, 3], [4, 5, 6]]),
			m4 = new MathLib.Matrix([[1, 1, 2], [3, 5, 8]]);

	equal(m1.compare(m2), -1);
	equal(m2.compare(m3), 0);
	equal(m3.compare(m4), 1);
});