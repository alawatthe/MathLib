test('.prototype.toMathML()', 3, function () {
	equal((new  MathLib.Integer('1234')).toMathML(), '<mn>1234</mn>');
	equal((new  MathLib.Integer('+1234')).toMathML(), '<mn>1234</mn>');
	equal((new  MathLib.Integer('-1234')).toMathML(), '<mn>-1234</mn>');
});