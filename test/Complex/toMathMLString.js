test('.toMathMLString()', 5, function () {
	var c = new MathLib.Complex(3, 4),
			d = new MathLib.Complex(0, 7),
			e = new MathLib.Complex(4, 0),
			f = new MathLib.Complex(4, -5),
			g = new MathLib.Complex(0, 0);
	equal(c.toMathMLString(), '<mn>3</mn><mo>+</mo><mn>4</mn><mo>&#x2062;</mo><mi>i</mi>', 'Normal complex number.');
	equal(d.toMathMLString(), '<mn>7</mn><mo>&#x2062;</mo><mi>i</mi>', 'Real part is zero.');
	equal(e.toMathMLString(), '<mn>4</mn>', 'Complex part is zero.');
	equal(f.toMathMLString(), '<mn>4</mn><mo>-</mo><mn>5</mn><mo>&#x2062;</mo><mi>i</mi>', 'Complex part is negative.');
	equal(g.toMathMLString(), '<mn>0</mn>', 'Number is zero.');
});