test('.toString()', 1, function () {
	var line = new MathLib.Line([3, 2, 1]);

	equal(line.toString(), '(3, 2, 1)', '.toString()');
});