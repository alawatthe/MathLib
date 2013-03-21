test('.hypot2()', 6, function () {
	equal(MathLib.isEqual(MathLib.hypot2(3, 4), 25), true);
	equal(MathLib.isEqual(MathLib.hypot2(3, 4, 12), 169), true);
	deepEqual(MathLib.hypot2(NaN, 4), NaN);
	equal(MathLib.hypot2(NaN, Infinity), Infinity);
	equal(MathLib.hypot2(-Infinity, NaN), Infinity);
	equal(MathLib.hypot2(Infinity, 4), Infinity);
});