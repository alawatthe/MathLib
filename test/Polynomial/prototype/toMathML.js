test('.toMathML()', 2, function () {
	var p = new MathLib.Polynomial([1, 2, 3]),
			q = new MathLib.Polynomial([-1, 0, 1]);
	deepEqual(p.toMathML(), '<mrow><mn>3</mn><mo>&#x2062;</mo><msup><mi>x</mi>' +
		'<mn>2</mn></msup><mo>+</mo><mn>2</mn><mo>&#x2062;</mo><mi>x</mi><mo>+' +
		'</mo><mn>1</mn></mrow>', '.toMathML()');
	deepEqual(q.toMathML(), '<mrow><mn>1</mn><mo>&#x2062;</mo><msup><mi>x</mi>' +
		'<mn>2</mn></msup><mo>-</mo><mn>1</mn></mrow>', '.toMathML()');
});