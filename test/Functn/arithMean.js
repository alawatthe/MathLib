test('.arithMean()', 1, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]);
	equal(MathLib.arithMean(s), 26 / 5, 'Testing .arithMean() (set)');
});