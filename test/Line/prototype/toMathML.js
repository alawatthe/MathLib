test('.toMathML()', 1, function () {
	var line = new MathLib.Line([3, 2, 1]);

	equal(line.toMathML(), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>3</mn></mtd>' +
		'</mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd></mtr>' +
		'</mtable><mo>)</mo></mrow>', '.toMathML()');
});