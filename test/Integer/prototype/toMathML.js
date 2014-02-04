test('.prototype.toMathML()', 9, function () {
	equal((new MathLib.Integer('1234')).toMathML(), '<mn>1234</mn>');
	equal((new MathLib.Integer('+1234')).toMathML(), '<mn>1234</mn>');
	equal((new MathLib.Integer('-1234')).toMathML(), '<mn>-1234</mn>');

	equal((new MathLib.Integer(7)).toMathML({base: 2}), '<mn>111</mn>');
	equal((new MathLib.Integer(7)).toMathML({baseSubscript: true}), '<msub><mn>7</mn><mn>10</mn></msub>');
	equal((new MathLib.Integer(7)).toMathML({base: 2, baseSubscript: true}), '<msub><mn>111</mn><mn>2</mn></msub>');

	equal((new MathLib.Integer(0)).toMathML({sign: true}), '<mn>+0</mn>');
	equal((new MathLib.Integer(-0)).toMathML({sign: true}), '<mn>+0</mn>');
	equal((new MathLib.Integer(1)).toMathML({sign: true}), '<mn>+1</mn>');
});