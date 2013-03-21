test('.factor()', 2, function () {
	deepEqual(MathLib.factor(12), new MathLib.Set([2, 2, 3], true));
	deepEqual(MathLib.factor(-15), new MathLib.Set([3, 5], true));
});