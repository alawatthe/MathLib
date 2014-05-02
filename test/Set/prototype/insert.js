test('.insert()', 4, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]);
	ok(s.insert(1).isEqual(new MathLib.Set([1, 2, 3, 4, 8, 9])), 'Testing .insert() (set, front)');
	ok(s.insert(3).isEqual(new MathLib.Set([1, 2, 3, 4, 8, 9])), 'Testing .insert() (set, existing)');
	ok(s.insert(5).isEqual(new MathLib.Set([1, 2, 3, 4, 5, 8, 9])), 'Testing .insert() (set, not existing)');
	ok(s.insert(10).isEqual(new MathLib.Set([1, 2, 3, 4, 5, 8, 9, 10])), 'Testing .insert() (set, back)');
});