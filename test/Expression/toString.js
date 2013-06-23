test('.toString', 10, function () {
	equal(MathLib.Expression.parse('123.456E-7').toString(), '123.456E-7', '("123.456E-7").toString()');
	equal(MathLib.Expression.parse('1+2').toString(), '1+2', '("1+2").toString()');
	equal(MathLib.Expression.parse('(1+2)*3').toString(), '(1+2)*3', '("(1+2)*3").toString()');
	equal(MathLib.Expression.parse('sin(1)').toString(), 'sin(1)', '("sin(1)").toString()');
	equal(MathLib.Expression.parse('sin(1)+cos(exp(2)*3)').toString(), 'sin(1)+cos(exp(2)*3)', '("sin(1)+cos(exp(2)*3)").toString()');

	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cs>MathLib.js - A mathematical JavaScript library</cs></math>').toString(), '"MathLib.js - A mathematical JavaScript library"', '.toString() cs');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn type="rational">3<sep/>4</cn></math>').toString(), '3/4', '.parse() rational');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><matrix><matrixrow><cn>1</cn><cn>2</cn></matrixrow><matrixrow><cn>3</cn><cn>4</cn></matrixrow><matrixrow><cn>5</cn><cn>6</cn></matrixrow></matrix></math>').toString(), '⎛1\t2⎞\n⎜3\t4⎟\n⎝5\t6⎠', '.evaluate() matrix');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><set><cn>1</cn><cn>2</cn><cn>3</cn></set></math>').toString(), '{1, 2, 3}', '.toString() set');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><vector><cn>1</cn><cn>2</cn><cn>3</cn></vector></math>').toString(), '(1, 2, 3)', 'toString() vector');

});