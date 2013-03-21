test('.max()', 3, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]);
	equal(MathLib.max([1, 42, 17, 4]), 42);
	equal(MathLib.max(1, 42, 17, 4), 42);
	equal(MathLib.max(s), 9, 'Testing .max() (set)');
});