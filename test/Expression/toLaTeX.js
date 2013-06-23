test('.toLaTeX', 13, function () {
	equal(MathLib.Expression.parse('123.456E-7').toLaTeX(), '123.456E-7', '("123.456E-7").toLaTeX()');
	equal(MathLib.Expression.parse('1+2').toLaTeX(), '1+2', '("1+2").toLaTeX()');
	equal(MathLib.Expression.parse('(1+2)*3').toLaTeX(), '\\left(1+2\\right)\\cdot3', '("(1+2)*3").toLaTeX()');
	equal(MathLib.Expression.parse('sin(1)').toLaTeX(), '\\sin\\left(1\\right)', '("sin(1)").toLaTeX()');
	equal(MathLib.Expression.parse('exp(1)').toLaTeX(), 'e^{1}', '("exp(1)").toLaTeX()');
	equal(MathLib.Expression.parse('sqrt(1)').toLaTeX(), '\\sqrt{1}', '("sqrt(1)").toLaTeX()');
	equal(MathLib.Expression.parse('arsinh(1)').toLaTeX(), '\\operatorname{arsinh}\\left(1\\right)', '("arsinh(1)").toLaTeX()');
	equal(MathLib.Expression.parse('sin(1)+cos(exp(2)*3)').toLaTeX(), '\\sin\\left(1\\right)+\\cos\\left(e^{2}\\cdot3\\right)', '("sin(1)+cos(exp(2)*3)").toLaTeX()');


	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cs>MathLib.js - A mathematical JavaScript library</cs></math>').toLaTeX(), '\\texttt{"{}MathLib.js - A mathematical JavaScript library"}', '.toLaTeX() cs');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn type="rational">3<sep/>4</cn></math>').toLaTeX(), '\\frac{3}{4}', '.parse() rational');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><matrix><matrixrow><cn>1</cn><cn>2</cn></matrixrow><matrixrow><cn>3</cn><cn>4</cn></matrixrow><matrixrow><cn>5</cn><cn>6</cn></matrixrow></matrix></math>').toLaTeX(), '\\begin{pmatrix}1&2\\\\3&4\\\\5&6\\end{pmatrix}', '.evaluate() matrix');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><set><cn>1</cn><cn>2</cn><cn>3</cn></set></math>').toLaTeX(), '\\left{1, 2, 3\\right}', '.toLaTeX() set');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><vector><cn>1</cn><cn>2</cn><cn>3</cn></vector></math>').toLaTeX(), '\\begin{pmatrix}1\\\\2\\\\3\\end{pmatrix}', 'toLaTeX() vector');
});