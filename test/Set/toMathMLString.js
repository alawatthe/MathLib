test('.toMathMLString()', 2, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
			e = new MathLib.Set();
	equal(s.toMathMLString(), '<mrow><mo>{</mo><mn>2</mn><mo>,</mo><mn>3</mn><mo>,</mo><mn>4</mn><mo>,</mo><mn>8</mn><mo>,</mo><mn>9</mn><mo>}</mo></mrow>', 'Testing .toMathMLString() (set)');
	equal(e.toMathMLString(), '<mi>&#x2205;</mi>', 'Testing .toMathMLString() (empty set)');
});