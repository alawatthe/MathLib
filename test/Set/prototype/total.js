test('.total()', 1, function () {
	var s = new MathLib.Set([1, 2, 3, 4]);

	equal(s.total(), 10);
});
