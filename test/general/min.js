test('.min()', 3, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]);
	equal(MathLib.min([1, 42, 17, 4]), 1);
	equal(MathLib.min(1, 42, 17, 4), 1);
	equal(MathLib.min(s), 2, 'Testing .min() (set)');
});