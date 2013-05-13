test('.every()', 2, function () {
	var s1 = new MathLib.Set([1, 2, 3, 4]),
			s2 = new MathLib.Set([1, 3, 5, 7]);
	equal(s1.every(function (x) {
		return x % 2;
	}), false, '.every()');
	equal(s2.every(function (x) {
		return x % 2;
	}), true, '.every()');
});