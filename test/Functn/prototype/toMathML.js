test('.toMathML()', 26, function () {
	equal(MathLib.abs.toMathML(), '<mrow><mi>x</mi><mo>&#x27FC;</mo><mrow><mo>|' +
		'</mo><mi>x</mi><mo>|</mo></mrow></mrow>');
	equal(MathLib.arctan2.toMathML(), '<mrow><mrow><mo>(</mo><mi>x</mi><mo>,</m' +
		'o><mi>y</mi><mo>)</mo></mrow><mo>&#x27FC;</mo><mrow><mi>arctan2</mi><mo>' +
		'&af;</mo><mrow><mo>(</mo><mi>x</mi><mo>,</mo><mi>y</mi><mo>)</mo></mrow></mrow></mrow>');
	equal(MathLib.binomial.toMathML(), '<mrow><mrow><mo>(</mo><mi>n</mi><mo>,</' +
		'mo><mi>k</mi><mo>)</mo></mrow><mo>&#x27FC;</mo><mrow><mfenced><mfrac ' +
	'linethickness="0"><mi>n</mi><mi>k</mi></mfrac></mfenced></mrow></mrow>');
	equal(MathLib.cbrt.toMathML(), '<mrow><mi>x</mi><mo>&#x27FC;</mo><mrow><mro' +
		'ot><mi>x</mi><mn>3</mn></mroot></mrow></mrow>');
	equal(MathLib.conjugate.toMathML(), '<mrow><mi>x</mi><mo>&#x27FC;</mo><mrow' +
		'><mover><mi>x</mi><mo>‾</mo></mover></mrow></mrow>');
	equal(MathLib.degToRad.toMathML(), '<mrow><mi>x</mi><mo>&#x27FC;</mo><mrow>' +
		'<mfrac><mi>&pi;</mi><mn>180</mn></mfrac><mo>&#x2062;</mo><mi>x</mi>' +
		'</mrow></mrow>');
	equal(MathLib.equivalent.toMathML(), '<mrow><mrow><mo>(</mo><mi>x</mi>' +
		'<mo>,</mo><mi>y</mi><mo>)</mo></mrow><mo>&#x27FC;</mo><mrow><mi>x</mi>' +
		'<mo>&#x21D4;</mo><mi>y</mi></mrow></mrow>');
	equal(MathLib.exp.toMathML(), '<mrow><mi>x</mi><mo>&#x27FC;</mo><mrow><mi>e' +
		'xp</mi><mo>&af;</mo><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></mrow>');
	equal(MathLib.factorial.toMathML(), '<mrow><mi>n</mi><mo>&#x27FC;</mo><mrow' +
		'><mi>n</mi><mo>!</mo></mrow></mrow>');
	equal(MathLib.implies.toMathML(), '<mrow><mrow><mo>(</mo><mi>x</mi><mo>,</m' +
		'o><mi>y</mi><mo>)</mo></mrow><mo>&#x27FC;</mo><mrow><mi>x</mi><mo>&#x21D2;</mo><mi>y</mi></mrow></mrow>');
	equal(MathLib.inverse.toMathML(), '<mrow><mi>x</mi><mo>&#x27FC;</mo><mrow><' +
		'mfrac><mn>1</mn><mi>x</mi></mfrac></mrow></mrow>');
	equal(MathLib.lg.toMathML(), '<mrow><mi>x</mi><mo>&#x27FC;</mo><mrow><mi>lg' +
		'</mi><mo>&#x2061;</mo><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow>');
	equal(MathLib.log.toMathML(), '<mrow><mrow><mo>(</mo><mi>b</mi><mo>,</mo><m' +
		'i>x</mi><mo>)</mo></mrow><mo>&#x27FC;</mo><mrow><msub><mi>log</mi>' +
		'<mi>b</mi></msub><mo>&#x2061;</mo><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow>');
	equal(MathLib.logGamma.toMathML(), '<mrow><mi>x</mi><mo>&#x27FC;</mo><mrow>' +
		'<mi>log</mi><mo>&#x2061;</mo><mo>(</mo><mi mathvariant="normal">' +
		'&#x0393;</mi><mo>&#x2061;</mo><mo>(</mo><mi>x</mi><mo>)</mo><mo>)</mo></mrow></mrow>');
	equal(MathLib.mod.toMathML(), '<mrow><mrow><mo>(</mo><mi>n</mi><mo>,</mo><m' +
		'i>m</mi><mo>)</mo></mrow><mo>&#x27FC;</mo><mrow><mi>n</mi><mi>mod</mi><mi>m</mi></mrow></mrow>');
	equal(MathLib.negative.toMathML(), '<mrow><mi>x</mi><mo>&#x27FC;</mo><mrow>' +
		'<mo>&#x2212;</mo><mi>x</mi></mrow></mrow>');
	equal(MathLib.pow.toMathML(), '<mrow><mrow><mo>(</mo><mi>x</mi><mo>,</mo><m' +
		'i>y</mi><mo>)</mo></mrow><mo>&#x27FC;</mo><mrow><msup><mi>x</mi><mi>y</mi></msup></mrow></mrow>');
	equal(MathLib.rem.toMathML(), '<mrow><mrow><mo>(</mo><mi>n</mi><mo>,</mo><m' +
		'i>m</mi><mo>)</mo></mrow><mo>&#x27FC;</mo><mrow><mi>n</mi><mi>rem</mi><mi>m</mi></mrow></mrow>');
	equal(MathLib.root.toMathML(), '<mrow><mrow><mo>(</mo><mi>x</mi><mo>,</mo><' +
		'mi>y</mi><mo>)</mo></mrow><mo>&#x27FC;</mo><mrow><mroot><mi>x</mi><mi>y</mi></mroot></mrow></mrow>');
	equal(MathLib.sin.toMathML(), '<mrow><mi>x</mi><mo>&#x27FC;</mo><mrow><mi>s' +
		'in</mi><mo>&af;</mo><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></mrow>');
	equal(MathLib.sqrt.toMathML(), '<mrow><mi>x</mi><mo>&#x27FC;</mo><mrow><msq' +
		'rt><mi>x</mi></msqrt></mrow></mrow>');

	equal(MathLib.exp(MathLib.sin).toMathML(), '<mrow><mi>x</mi><mo>&#x27FC;' +
		'</mo><mrow><mi>exp</mi><mo>&af;</mo><mrow><mo>(</mo><mrow><mi>sin</mi>' +
		'<mo>&af;</mo><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)' +
		'</mo></mrow></mrow></mrow>', 'MathLib.exp(MathLib.sin).toMathML()');
	// equal(MathLib.pow(MathLib.sin, 2).toMathML(), '<mrow><msup><mrow>' +
	// '<mi>sin</mi><mo>&af;</mo><mfenced><mi>x</mi></mfenced></mrow><mn>2' +
	// '</mn></msup></mrow>', 'MathLib.pow(MathLib.sin, 2).toMathML()');
	equal(MathLib.plus(MathLib.sin, 2).toMathML(), '<mrow><mi>x</mi>' +
		'<mo>&#x27FC;</mo><mrow><mrow><mi>sin</mi><mo>&af;</mo><mrow><mo>(</mo>' +
		'<mi>x</mi><mo>)</mo></mrow></mrow><mo>+</mo><mn>2</mn></mrow></mrow>',
		'MathLib.plus(MathLib.sin, 2).toMathML()');
	equal(MathLib.plus(2, MathLib.sin).toMathML(), '<mrow><mi>x</mi>' +
		'<mo>&#x27FC;</mo><mrow><mn>2</mn><mo>+</mo><mrow><mi>sin</mi><mo>&af;' +
		'</mo><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></mrow></mrow>',
		'MathLib.plus(2, MathLib.sin).toMathML()');
	equal(MathLib.times(2, MathLib.sin).toMathML(), '<mrow><mi>x</mi>' +
		'<mo>&#x27FC;</mo><mrow><mn>2</mn><mo>&middot;</mo><mrow><mi>sin</mi>' +
		'<mo>&af;</mo><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></mrow></mrow>',
		'MathLib.times(2, MathLib.sin).toMathML()');
	equal(MathLib.plus(MathLib.sin, MathLib.cos).toMathML(),
		'<mrow><mi>x</mi><mo>&#x27FC;</mo><mrow><mrow><mi>sin</mi><mo>&af;</mo>' +
		'<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>+</mo><mrow><mi>' +
		'cos</mi><mo>&af;</mo><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow>' +
		'</mrow></mrow>', 'MathLib.plus(MathLib.sin, MathLib.cos).toMathML()');
});