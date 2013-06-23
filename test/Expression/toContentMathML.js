test('.toContentMathML', 5, function () {
	equal(MathLib.Expression.parse('123.456E-7').toContentMathML(), '<cn>123.456E-7</cn>', '("123.456E-7").toContentMathML()');
	equal(MathLib.Expression.parse('1+2').toContentMathML(), '<apply><csymbol cd="arith1">plus</csymbol><cn>1</cn><cn>2</cn></apply>', '("1+2").toContentMathML()');
	equal(MathLib.Expression.parse('(1+2)*3').toContentMathML(), '<apply><csymbol cd="arith1">times</csymbol><apply><csymbol cd="arith1">plus</csymbol><cn>1</cn><cn>2</cn></apply><cn>3</cn></apply>', '("(1+2)*3").toContentMathML()');
	equal(MathLib.Expression.parse('sin(1)').toContentMathML(), '<apply><csymbol cd="transc1">sin</csymbol><cn>1</cn></apply>', '("sin(1)").toContentMathML()');
	equal(MathLib.Expression.parse('sin(1)+cos(exp(2)*3)').toContentMathML(), '<apply><csymbol cd="arith1">plus</csymbol><apply><csymbol cd="transc1">sin</csymbol><cn>1</cn></apply><apply><csymbol cd="transc1">cos</csymbol><apply><csymbol cd="arith1">times</csymbol><apply><csymbol cd="transc1">exp</csymbol><cn>2</cn></apply><cn>3</cn></apply></apply></apply>', '("sin(1)+cos(exp(2)*3)").toContentMathML()');
});