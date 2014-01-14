test('.prototype.toMathML()', 1, function () {
	var r = new MathLib.Rational(2, 3);
	equal(r.toMathML(), '<mfrac><mn>2</mn><mn>3</mn></mfrac>', '.toMathML()');
});