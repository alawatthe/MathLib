test('.toMathML()', 15, function () {
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

	equal(MathLib.toMathML(123, {base: 2, baseSubscript: true, sign: true}), '<mo>+</mo><msub><mn>1111011</mn><mn>2</mn></msub>');
	equal(MathLib.toMathML(-123, {base: 2, baseSubscript: true, sign: true}), '<mo>-</mo><msub><mn>1111011</mn><mn>2</mn></msub>');
});