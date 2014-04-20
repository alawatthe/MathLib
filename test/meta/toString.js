test('.toString()', 21, function () {
	equal(MathLib.toString([1, 2, [3, 4], new MathLib.Rational(1, 2)]), '[1,2,[3,4],1/2]');

	equal(MathLib.toString(NaN), 'NaN');
	equal(MathLib.toString(Infinity), 'Infinity');
	equal(MathLib.toString(-Infinity), '-Infinity');

	equal(MathLib.toString(123), '123');
	equal(MathLib.toString(-123), '-123');

	equal(MathLib.toString(123, {sign: true}), '+123');
	equal(MathLib.toString(-123, {sign: true}), '-123');

	equal(MathLib.toString(123, {base: 2}), '1111011');
	equal(MathLib.toString(-123, {base: 2}), '-1111011');
	equal(MathLib.toString(123, {base: 2, sign: true}), '+1111011');
	equal(MathLib.toString(-123, {base: 2, sign: true}), '-1111011');

	equal(MathLib.toString(123, {base: 2, baseSubscript: true}), '1111011&#x2082;');
	equal(MathLib.toString(-123, {base: 2, baseSubscript: true}), '-1111011&#x2082;');

	equal(MathLib.toString(123, {base: 2, baseSubscript: true, sign: true}), '+1111011&#x2082;');
	equal(MathLib.toString(-123, {base: 2, baseSubscript: true, sign: true}), '-1111011&#x2082;');

	equal(MathLib.toString(true), 'true');
	equal(MathLib.toString(false), 'false');
	equal(MathLib.toString('MathLib'), '"MathLib"');
	equal(MathLib.toString('MathLib', {quotes: ['\'', '\'']}), '\'MathLib\'');

	equal(MathLib.toString(new MathLib.Rational(1, 2)), '1/2');
});