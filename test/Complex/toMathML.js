test('.toMathML()', 5, function () {
	var c = new MathLib.Complex(3, 4),
			d = new MathLib.Complex(0, 7),
			e = new MathLib.Complex(4, 0),
			f = new MathLib.Complex(4, -5),
			g = new MathLib.Complex(0, 0);
	equal(c.toMathML(), '<mn>3</mn><mo>+</mo><mn>4</mn><mo>&#x2062;</mo><mi>i</mi>', 'Normal complex number.');
	equal(d.toMathML(), '<mn>7</mn><mo>&#x2062;</mo><mi>i</mi>', 'Real part is zero.');
	equal(e.toMathML(), '<mn>4</mn>', 'Complex part is zero.');
	equal(f.toMathML(), '<mn>4</mn><mo>-</mo><mn>5</mn><mo>&#x2062;</mo><mi>i</mi>', 'Complex part is negative.');
	equal(g.toMathML(), '<mn>0</mn>', 'Number is zero.');
});