test('.remove()', 1, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]);

	ok(s.remove(3).isEqual(new MathLib.Set([2, 4, 8, 9])));
});