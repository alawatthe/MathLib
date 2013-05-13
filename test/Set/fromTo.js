test('fromTo()', 1, function () {
	deepEqual(new MathLib.Set.fromTo(1, 5, 2), new MathLib.Set([1, 3, 5]), 'Testing new MathLib.Set.fromTo()');
});