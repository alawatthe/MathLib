test('.and()', 14, function () {
	equal(MathLib.and(), true);
	equal(MathLib.and([]), true);
	equal(MathLib.and(true), true);
	equal(MathLib.and([true]), true);
	equal(MathLib.and(false), false);
	equal(MathLib.and([false]), false);
	equal(MathLib.and(true, true), true, 'true and true = true');
	equal(MathLib.and([true, true]), true, 'true and true = true');
	equal(MathLib.and(true, false), false, 'true and false = false');
	equal(MathLib.and([true, false]), false, 'true and false = false');
	equal(MathLib.and(false, true), false, 'false and true = false');
	equal(MathLib.and([false, true]), false, 'false and true = false');
	equal(MathLib.and(false, false), false, 'false and false = false');
	equal(MathLib.and([false, false]), false, 'false and false = false');
});