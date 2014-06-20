test('.toMathML()', 2, function () {
	var point = new MathLib.Point([3, 2, 1]);

	equal(point.toMathML(), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>3</mn></mtd>' +
		'</mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable><mo>)</mo></mrow>', '.toMathML()');
	equal(point.toMathML(true), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>3</mn>' +
		'</mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd>' +
		'</mtr></mtable><mo>)</mo></mrow>', '.toMathML()');
});