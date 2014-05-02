test('.filter()', 1, function () {
	var s1 = new MathLib.Set([1, 2, 3, 4]),
			s2 = new MathLib.Set([1, 3]);

	ok(s1.filter(function (x) {
		return x % 2;
	}).isEqual(s2), '.filter()');
});