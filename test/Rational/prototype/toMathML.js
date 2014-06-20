test('.prototype.toMathML()', 8, function () {
	var r = new MathLib.Rational(2, 3),
			p = new MathLib.Rational(-2, 3);

	equal(r.toMathML(), '<mfrac><mn>2</mn><mn>3</mn></mfrac>', '.toMathML()');
	equal(r.toMathML({sign: true}), '<mo>+</mo><mfrac><mn>2</mn><mn>3</mn></mfrac>', '.toMathML()');
	equal(r.toMathML({base: 2}), '<mfrac><mn>10</mn><mn>11</mn></mfrac>', '.toMathML()');
	equal(r.toMathML({base: 2, baseSubscript: true}), '<mfrac><msub><mn>10</mn>' +
		'<mn>2</mn></msub><msub><mn>11</mn><mn>2</mn></msub></mfrac>', '.toMathML()');

	equal(p.toMathML(), '<mfrac><mn>-2</mn><mn>3</mn></mfrac>', '.toMathML()');
	equal(p.toMathML({sign: true}), '<mo>-</mo><mfrac><mn>2</mn><mn>3</mn></mfrac>', '.toMathML()');
	equal(p.toMathML({base: 2}), '<mfrac><mn>-10</mn><mn>11</mn></mfrac>', '.toMathML()');
	equal(p.toMathML({base: 2, baseSubscript: true}), '<mfrac><msub><mn>-10</mn>' +
		'<mn>2</mn></msub><msub><mn>11</mn><mn>2</mn></msub></mfrac>', '.toMathML()');
});