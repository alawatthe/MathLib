test('.ln()', 8, function () {
	equal(MathLib.ln(1), 0, 'MathLib.ln(1) should be 0');
	equal(MathLib.ln(Math.E), 1, 'MathLib.ln(Math.E) should be 1');
	equal(MathLib.ln(+Infinity), +Infinity, 'MathLib.ln(+Infinity) should be +Infinity');
	equal(MathLib.ln(+0), -Infinity, 'MathLib.ln(+0) should be -Infinity');
	equal(MathLib.ln(-0), -Infinity, 'MathLib.ln(-0) should be -Infinity');
	equal(MathLib.isNaN(MathLib.ln(-4)), true, 'MathLib.ln(-4) should be NaN');
	equal(MathLib.isNaN(MathLib.ln(-Infinity)), true, 'MathLib.ln(-Infinity) should be NaN');
	equal(MathLib.isNaN(MathLib.ln(NaN)), true, 'MathLib.ln(NaN) should be NaN');
});