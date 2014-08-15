test('.toMathML()', 3, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
			e = new MathLib.Set();

	equal(s.toMathML(), '<mrow><mo>{</mo><mn>2</mn><mo>,</mo><mn>3</mn><mo>,' +
		'</mo><mn>4</mn><mo>,</mo><mn>8</mn><mo>,</mo><mn>9</mn><mo>}</mo></mrow>',
		'Testing .toMathML() (set)');
	equal(s.toMathML({base: 2}), '<mrow><mo>{</mo><mn>10</mn><mo>,</mo><mn>11</mn><mo>,' +
		'</mo><mn>100</mn><mo>,</mo><mn>1000</mn><mo>,</mo><mn>1001</mn><mo>}</mo></mrow>',
		'Testing .toMathML() (set)');
	equal(e.toMathML(), '<mi>&#x2205;</mi>', 'Testing .toMathML() (empty set)');
});
