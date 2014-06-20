test('.toContentMathML', 10, function () {
	equal(MathLib.Expression.parse('123.456E-7').toContentMathML(), '<cn>123.456E-7</cn>', '("123.456E-7").toContentMathML()');
	equal(MathLib.Expression.parse('1+2').toContentMathML(), '<apply><csymbol ' +
		'cd="arith1">plus</csymbol><cn>1</cn><cn>2</cn></apply>', '("1+2").toContentMathML()');
	equal(MathLib.Expression.parse('(1+2)*3').toContentMathML(), '<apply><csymbol ' +
		'cd="arith1">times</csymbol><apply><csymbol cd="arith1">plus</csymbol>' +
		'<cn>1</cn><cn>2</cn></apply><cn>3</cn></apply>', '("(1+2)*3").toContentMathML()');
	equal(MathLib.Expression.parse('2-3-4').toContentMathML(), '<apply><csymbol ' +
		'cd="arith1">minus</csymbol><apply><csymbol cd="arith1">minus</csymbol>' +
		'<cn>2</cn><cn>3</cn></apply><cn>4</cn></apply>', '("2-3-4").toContentMathML()');

	equal(MathLib.Expression.parse('2/3/4').toContentMathML(), '<apply><csymbol ' +
		'cd="arith1">divide</csymbol><apply><csymbol cd="arith1">divide</csymbol>' +
		'<cn>2</cn><cn>3</cn></apply><cn>4</cn></apply>', '("2/3/4").toContentMathML()');

	equal(MathLib.Expression.parse('2^3^4').toContentMathML(), '<apply><csymbol ' +
		'cd="arith1">power</csymbol><cn>2</cn><apply><csymbol cd="arith1">power' +
		'</csymbol><cn>3</cn><cn>4</cn></apply></apply>', '("2^3^4").toContentMathML()');

	equal(MathLib.Expression.parse('sin(1)').toContentMathML(), '<apply><csymbol ' +
		'cd="transc1">sin</csymbol><cn>1</cn></apply>', '("sin(1)").toContentMathML()');
	equal(MathLib.Expression.parse('sin(1)+cos(exp(2)*3)').toContentMathML(),
		'<apply><csymbol cd="arith1">plus</csymbol><apply><csymbol cd="transc1">' +
		'sin</csymbol><cn>1</cn></apply><apply><csymbol cd="transc1">cos' +
		'</csymbol><apply><csymbol cd="arith1">times</csymbol><apply><csymbol ' +
		'cd="transc1">exp</csymbol><cn>2</cn></apply><cn>3</cn></apply></apply>' +
		'</apply>', '("sin(1)+cos(exp(2)*3)").toContentMathML()');

	equal(MathLib.Expression.parse('a := 1').toContentMathML(),
		'<apply><csymbol cd="prog1">assignment</csymbol><ci>a</ci><cn>1</cn></apply>');
	equal(MathLib.Expression.parse('b := c := 2').toContentMathML(),
		'<apply><csymbol cd="prog1">assignment</csymbol><ci>b</ci><apply>' +
		'<csymbol cd="prog1">assignment</csymbol><ci>c</ci><cn>2</cn></apply></apply>');
});