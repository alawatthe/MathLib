test('.locate()', 4, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]);
	equal(s.locate(1), 0, 'Testing .locate()');
	equal(s.locate(3), 1, 'Testing .locate()');
	equal(s.locate(5), 3, 'Testing .locate()');
	equal(s.locate(10), 5, 'Testing .locate()');
});