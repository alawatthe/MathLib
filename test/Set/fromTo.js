test('fromTo()', 1, function () {
	ok((new MathLib.Set.fromTo(1, 5, 2)).isEqual(new MathLib.Set([1, 3, 5])), 'Testing new MathLib.Set.fromTo()');
});