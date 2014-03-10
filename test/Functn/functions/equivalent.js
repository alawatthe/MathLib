test('.equivalent()', 4, function () {
	equal(MathLib.equivalent(true, true), true, 'true <=> true = true');
	equal(MathLib.equivalent(true, false), false, 'true <=> false = false');
	equal(MathLib.equivalent(false, true), false, 'false <=> true = false');
	equal(MathLib.equivalent(false, false), true, 'false <=> false = true');
});