test('.toMathML', 10, function () {
	equal(MathLib.Expression.parse('123.456E-7').toMathML(),
		'<mn>123.456E-7</mn>', '("123.456E-7").toMathML()');
	equal(MathLib.Expression.parse('1+2').toMathML(), '<mrow><mn>1</mn>' +
		'<mo>+</mo><mn>2</mn></mrow>', '("1+2").toMathML()');
	equal(MathLib.Expression.parse('(1+2)*3').toMathML(), '<mrow><mrow>' +
		'<mo>(</mo><mrow><mn>1</mn><mo>+</mo><mn>2</mn></mrow><mo>)</mo></mrow>' +
		'<mo>&middot;</mo><mn>3</mn></mrow>', '("(1+2)*3").toMathML()');
	equal(MathLib.Expression.parse('2-3-4').toMathML(), '<mn>2</mn><mo>-</mo>' +
		'<mn>3</mn><mo>-</mo><mn>4</mn>', '("2-3-4").toMathML()');
	equal(MathLib.Expression.parse('2/3/4').toMathML(), '<mfrac><mfrac>' +
		'<mn>2</mn><mn>3</mn></mfrac><mn>4</mn></mfrac>', '("2/3/4").toMathML()');
	equal(MathLib.Expression.parse('2^3^4').toMathML(), '<msup><mn>2</mn><msup>' +
		'<mn>3</mn><mn>4</mn></msup></msup>', '("2^3^4").toMathML()');
	equal(MathLib.Expression.parse('sin(1)').toMathML(), '<mrow><mi>sin</mi>' +
		'<mo>&af;</mo><mrow><mo>(</mo><mn>1</mn><mo>)</mo></mrow></mrow>', '("sin(1)").toMathML()');
	equal(MathLib.Expression.parse('sin(1)+cos(exp(2)*3)').toMathML(),
		'<mrow><mrow><mi>sin</mi><mo>&af;</mo><mrow><mo>(</mo><mn>1</mn><mo>)' +
		'</mo></mrow></mrow><mo>+</mo><mrow><mi>cos</mi><mo>&af;</mo><mrow><mo>(' +
		'</mo><mrow><mrow><mi>exp</mi><mo>&af;</mo><mrow><mo>(</mo><mn>2</mn>' +
		'<mo>)</mo></mrow></mrow><mo>&middot;</mo><mn>3</mn></mrow><mo>)</mo>' +
		'</mrow></mrow></mrow>', '("sin(1)+cos(exp(2)*3)").toMathML()');
	equal(MathLib.Expression.parse('a := 1').toMathML(), '<mi>a</mi><mo>:=</mo><mn>1</mn>');
	equal(MathLib.Expression.parse('b := c := 2').toMathML(), '<mi>b</mi><mo>:=</mo><mi>c</mi><mo>:=</mo><mn>2</mn>');
});