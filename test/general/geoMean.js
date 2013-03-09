test('.geoMean()', 1, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]);
	equal(MathLib.geoMean(s), Math.pow(1728, 1 / 5), 'Testing .geoMean() (set)');
});