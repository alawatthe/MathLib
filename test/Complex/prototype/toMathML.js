test('.toMathML()', 22, function () {
	var c1 = new MathLib.Complex(3, 4),
			c2 = new MathLib.Complex(-3, 4),
			c3 = new MathLib.Complex(3, -4),
			c4 = new MathLib.Complex(-3, -4),
			d1 = new MathLib.Complex(0, 7),
			d2 = new MathLib.Complex(0, -7),
			e1 = new MathLib.Complex(4, 0),
			e2 = new MathLib.Complex(-4, 0),
			f = new MathLib.Complex(0, 0);

	equal((new MathLib.Complex(NaN)).toMathML(), '<mi>ComplexNaN</mi>');
	equal((new MathLib.Complex(NaN)).toMathML({sign: true}), '<mo>+</mo><mi>ComplexNaN</mi>');
	equal((new MathLib.Complex(Infinity)).toMathML(), '<mi>ComplexInfinity</mi>');
	equal((new MathLib.Complex(Infinity)).toMathML({sign: true}), '<mo>+</mo><mi>ComplexInfinity</mi>');

	equal(c1.toMathML(), '<mn>3</mn><mo>+</mo><mrow><mn>4</mn><mo>&#x2062;</mo><mi>i</mi></mrow>', 'Normal complex number.');
	equal(c1.toMathML({sign: true}), '<mo>+</mo><mn>3</mn><mo>+</mo><mrow>' +
		'<mn>4</mn><mo>&#x2062;</mo><mi>i</mi></mrow>', 'Normal complex number.');

	equal(c2.toMathML(), '<mn>-3</mn><mo>+</mo><mrow><mn>4</mn><mo>&#x2062;</mo><mi>i</mi></mrow>', 'Normal complex number.');
	equal(c2.toMathML({sign: true}), '<mo>-</mo><mn>3</mn><mo>+</mo><mrow>' +
		'<mn>4</mn><mo>&#x2062;</mo><mi>i</mi></mrow>', 'Normal complex number.');

	equal(c3.toMathML(), '<mn>3</mn><mo>-</mo><mrow><mn>4</mn><mo>&#x2062;</mo><mi>i</mi></mrow>', 'Normal complex number.');
	equal(c3.toMathML({sign: true}), '<mo>+</mo><mn>3</mn><mo>-</mo><mrow>' +
		'<mn>4</mn><mo>&#x2062;</mo><mi>i</mi></mrow>', 'Normal complex number.');

	equal(c4.toMathML(), '<mn>-3</mn><mo>-</mo><mrow><mn>4</mn><mo>&#x2062;</mo><mi>i</mi></mrow>', 'Normal complex number.');
	equal(c4.toMathML({sign: true}), '<mo>-</mo><mn>3</mn><mo>-</mo><mrow>' +
		'<mn>4</mn><mo>&#x2062;</mo><mi>i</mi></mrow>', 'Normal complex number.');

	equal(d1.toMathML(), '<mrow><mn>7</mn><mo>&#x2062;</mo><mi>i</mi></mrow>', 'Real part is zero.');
	equal(d1.toMathML({sign: true}), '<mo>+</mo><mrow><mn>7</mn><mo>&#x2062;</mo><mi>i</mi></mrow>', 'Real part is zero.');

	equal(d2.toMathML(), '<mrow><mn>-7</mn><mo>&#x2062;</mo><mi>i</mi></mrow>', 'Real part is zero.');
	equal(d2.toMathML({sign: true}), '<mo>-</mo><mrow><mn>7</mn><mo>&#x2062;</mo><mi>i</mi></mrow>', 'Real part is zero.');

	equal(e1.toMathML(), '<mn>4</mn>', 'Complex part is zero.');
	equal(e1.toMathML({sign: true}), '<mo>+</mo><mn>4</mn>', 'Complex part is zero.');
	equal(e2.toMathML(), '<mn>-4</mn>', 'Complex part is zero.');
	equal(e2.toMathML({sign: true}), '<mo>-</mo><mn>4</mn>', 'Complex part is zero.');

	equal(f.toMathML(), '<mn>0</mn>', 'Number is zero.');
	equal(f.toMathML({sign: true}), '<mo>+</mo><mn>0</mn>', 'Number is zero.');
});