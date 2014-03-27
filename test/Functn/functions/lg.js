test('.lg()', 8, function () {
	equal(MathLib.lg(1), 0, 'MathLib.lg(1) should be 0');
	equal(MathLib.lg(10), 1, 'MathLib.lg(10) should be 1');
	equal(MathLib.lg(+Infinity), +Infinity, 'MathLib.lg(+Infinity) should be +Infinity');
	equal(MathLib.lg(+0), -Infinity, 'MathLib.lg(+0) should be -Infinity');
	equal(MathLib.lg(-0), -Infinity, 'MathLib.lg(-0) should be -Infinity');
	equal(MathLib.isNaN(MathLib.lg(-4)), true, 'MathLib.lg(-4) should be NaN');
	equal(MathLib.isNaN(MathLib.lg(-Infinity)), true, 'MathLib.lg(-Infinity) should be NaN');
	equal(MathLib.isNaN(MathLib.lg(NaN)), true, 'MathLib.lg(NaN) should be NaN');
});