test('.not()', 2, function () {
	equal(MathLib.not(true), false, 'not true = false');
	equal(MathLib.not(false), true, 'not false = true');
});