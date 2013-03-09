test('.xor()', 14, function () {
	equal(MathLib.xor(), false);
	equal(MathLib.xor([]), false);
	equal(MathLib.xor(true), true);
	equal(MathLib.xor([true]), true);
	equal(MathLib.xor(false), false);
	equal(MathLib.xor([false]), false);
	equal(MathLib.xor(true, true), false, 'true xor true = false');
	equal(MathLib.xor([true, true]), false, 'true xor true = false');
	equal(MathLib.xor(true, false), true, 'true xor false = true');
	equal(MathLib.xor([true, false]), true, 'true xor false = true');
	equal(MathLib.xor(false, true), true, 'false xor true = true');
	equal(MathLib.xor([false, true]), true, 'false xor true = true');
	equal(MathLib.xor(false, false), false, 'false xor false = false');
	equal(MathLib.xor([false, false]), false, 'false xor false = false');
});