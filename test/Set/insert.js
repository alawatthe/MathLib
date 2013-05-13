test('.insert()', 4, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]);
	deepEqual(s.insert(1), new MathLib.Set([1, 2, 3, 4, 8, 9]), 'Testing .locate() (set, front)');
	deepEqual(s.insert(3), new MathLib.Set([1, 2, 3, 4, 8, 9]), 'Testing .locate() (set, existing)');
	deepEqual(s.insert(5), new MathLib.Set([1, 2, 3, 4, 5, 8, 9]), 'Testing .locate() (set, not existing)');
	deepEqual(s.insert(10), new MathLib.Set([1, 2, 3, 4, 5, 8, 9, 10]), 'Testing .locate() (set, back)');
});