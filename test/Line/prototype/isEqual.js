test('.isEqual()', 4, function () {
	var line1 = new MathLib.Line([3, 2, 1]),
			line2 = new MathLib.Line([6, 4, 2]),
			line3 = new MathLib.Line([1, 1, 1]),
			line4 = new MathLib.Line([1, 1, 1, 1]),
			line5 = new MathLib.Line([0, 0, 1]),
			line6 = new MathLib.Line([0, 0, 2]);

	equal(line1.isEqual(line2), true, '.isEqual()');
	equal(line1.isEqual(line3), false, '.isEqual()');
	equal(line3.isEqual(line4), false, '.isEqual()');
	equal(line5.isEqual(line6), true, '.isEqual() two representations of the infinite line');
});