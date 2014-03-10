test('.implies()', 4, function () {
	equal(MathLib.implies(true, true), true, 'true => true = true');
	equal(MathLib.implies(true, false), false, 'true => false = false');
	equal(MathLib.implies(false, true), true, 'false => true = true');
	equal(MathLib.implies(false, false), true, 'false => false = true');
});