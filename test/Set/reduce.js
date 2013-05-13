test('.reduce()', 1, function () {
	var s = new MathLib.Set([1, 2, 3, 4]);

	equal(s.reduce(function (old, cur) {
		return old * cur;
	}), 24, '.reduce()');
});