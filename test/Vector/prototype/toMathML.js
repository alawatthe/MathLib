test('.toMathML()', 1, function () {
	var v = new MathLib.Vector([1, 2, 3]);

	equal(v.toMathML(), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2' +
		'</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable><mo>)</mo></mrow>', '.toMathML()');
});