test('.toString()', 1, function () {
	var v = new MathLib.Vector([1, 2, 3]);

	equal(v.toString(), '(1, 2, 3)', '.toString()');
});