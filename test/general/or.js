test('.or()', 14, function () {
	equal(MathLib.or(), false);
	equal(MathLib.or([]), false);
	equal(MathLib.or(true), true);
	equal(MathLib.or([true]), true);
	equal(MathLib.or(false), false);
	equal(MathLib.or([false]), false);
	equal(MathLib.or(true, true), true, 'true or true = true');
	equal(MathLib.or([true, true]), true, 'true or true = true');
	equal(MathLib.or(true, false), true, 'true or false = true');
	equal(MathLib.or([true, false]), true, 'true or false = true');
	equal(MathLib.or(false, true), true, 'false or true = true');
	equal(MathLib.or([false, true]), true, 'false or true = true');
	equal(MathLib.or(false, false), false, 'false or false = false');
	equal(MathLib.or([false, false]), false, 'false or false = false');
});