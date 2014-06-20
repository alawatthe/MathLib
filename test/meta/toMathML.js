test('.toMathML()', 21, function () {
	equal(MathLib.toMathML([1, 2, [3, 4], new MathLib.Rational(1, 2)]),
		'<mrow><mo>[</mo><mn>1</mn><mo>,</mo><mn>2</mn><mo>,</mo><mrow><mo>[</mo>' +
		'<mn>3</mn><mo>,</mo><mn>4</mn><mo>]</mo></mrow><mo>,</mo><mfrac><mn>1' +
		'</mn><mn>2</mn></mfrac><mo>]</mo></mrow>');

	equal(MathLib.toMathML(NaN), '<mi>NaN</mi>');
	equal(MathLib.toMathML(Infinity), '<mi>&#x221e;</mi>');
	equal(MathLib.toMathML(-Infinity), '<mrow><mo>-</mo><mi>&#x221e;</mi></mrow>');

	equal(MathLib.toMathML(123), '<mn>123</mn>');
	equal(MathLib.toMathML(-123), '<mn>-123</mn>');

	equal(MathLib.toMathML(123, {sign: true}), '<mo>+</mo><mn>123</mn>');
	equal(MathLib.toMathML(-123, {sign: true}), '<mo>-</mo><mn>123</mn>');

	equal(MathLib.toMathML(123, {base: 2}), '<mn>1111011</mn>');
	equal(MathLib.toMathML(-123, {base: 2}), '<mn>-1111011</mn>');

	equal(MathLib.toMathML(123, {base: 2, sign: true}), '<mo>+</mo><mn>1111011</mn>');
	equal(MathLib.toMathML(-123, {base: 2, sign: true}), '<mo>-</mo><mn>1111011</mn>');

	equal(MathLib.toMathML(123, {base: 2, baseSubscript: true}), '<msub><mn>1111011</mn><mn>2</mn></msub>');
	equal(MathLib.toMathML(-123, {base: 2, baseSubscript: true}), '<msub><mn>-1111011</mn><mn>2</mn></msub>');

	equal(MathLib.toMathML(123, {base: 2, baseSubscript: true, sign: true}),
		'<mo>+</mo><msub><mn>1111011</mn><mn>2</mn></msub>');
	equal(MathLib.toMathML(-123, {base: 2, baseSubscript: true, sign: true}),
		'<mo>-</mo><msub><mn>1111011</mn><mn>2</mn></msub>');

	equal(MathLib.toMathML(true), '<mi>true</mi>');
	equal(MathLib.toMathML(false), '<mi>false</mi>');
	equal(MathLib.toMathML('MathLib'), '<ms>MathLib</ms>');
	equal(MathLib.toMathML('MathLib', {quotes: ['\'', '\'']}), '<ms lquote="\'" rquote="\'">MathLib</ms>');

	equal(MathLib.toMathML(new MathLib.Rational(1, 2)), '<mfrac><mn>1</mn><mn>2</mn></mfrac>');
});