test('.toMathML()', 1, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

	deepEqual(m.toMathML(), '<mrow><mo> ( </mo><mtable><mtr><mtd><mn>1</mn></mtd>' +
		'<mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd>' +
		'<mtd><mn>5</mn></mtd><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
		'<mtd><mn>8</mn></mtd><mtd><mn>9</mn></mtd></mtr></mtable><mo> ) </mo></mrow>', '.toMathML()');
});