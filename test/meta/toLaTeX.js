test('.toLaTeX()', 15, function () {
	equal(MathLib.toLaTeX(NaN), '\\text{ NaN }');
	equal(MathLib.toLaTeX(Infinity), '\\infty');
	equal(MathLib.toLaTeX(-Infinity), '-\\infty');

	equal(MathLib.toLaTeX(123), '123');
	equal(MathLib.toLaTeX(-123), '-123');

	equal(MathLib.toLaTeX(123, {sign: true}), '+123');
	equal(MathLib.toLaTeX(-123, {sign: true}), '-123');

	equal(MathLib.toLaTeX(123, {base: 2}), '1111011');
	equal(MathLib.toLaTeX(-123, {base: 2}), '-1111011');
	equal(MathLib.toLaTeX(123, {base: 2, sign: true}), '+1111011');
	equal(MathLib.toLaTeX(-123, {base: 2, sign: true}), '-1111011');

	equal(MathLib.toLaTeX(123, {base: 2, baseSubscript: true}), '1111011_{2}');
	equal(MathLib.toLaTeX(-123, {base: 2, baseSubscript: true}), '-1111011_{2}');

	equal(MathLib.toLaTeX(123, {base: 2, baseSubscript: true, sign: true}), '+1111011_{2}');
	equal(MathLib.toLaTeX(-123, {base: 2, baseSubscript: true, sign: true}), '-1111011_{2}');
});