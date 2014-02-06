test('.some()', 2, function () {
	var s1 = new MathLib.Set([1, 2, 3, 4]),
			s2 = new MathLib.Set([2, 4, 6, 8]);

	equal(s1.some(function (x) {
		return x % 2;
	}), true, '.some()');
	equal(s2.some(function (x) {
		return x % 2;
	}), false, '.some()');
});