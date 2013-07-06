test('.toMathML', 11, function () {
	equal(MathLib.Expression.parse('123.456E-7').toMathML(), '<mn>123.456E-7</mn>', '("123.456E-7").toMathML()');
	equal(MathLib.Expression.parse('1+2').toMathML(), '<mrow><mn>1</mn><mo>+</mo><mn>2</mn></mrow>', '("1+2").toMathML()');
	equal(MathLib.Expression.parse('(1+2)*3').toMathML(), '<mrow><mrow><mo>(</mo><mrow><mn>1</mn><mo>+</mo><mn>2</mn></mrow><mo>)</mo></mrow><mo>&middot;</mo><mn>3</mn></mrow>', '("(1+2)*3").toMathML()');
	equal(MathLib.Expression.parse('sin(1)').toMathML(), '<mrow><mi>sin</mi><mo>&af;</mo><mrow><mo>(</mo><mn>1</mn><mo>)</mo></mrow></mrow>', '("sin(1)").toMathML()');
	equal(MathLib.Expression.parse('sin(1)+cos(exp(2)*3)').toMathML(), '<mrow><mrow><mi>sin</mi><mo>&af;</mo><mrow><mo>(</mo><mn>1</mn><mo>)</mo></mrow></mrow><mo>+</mo><mrow><mi>cos</mi><mo>&af;</mo><mrow><mo>(</mo><mrow><mrow><mi>exp</mi><mo>&af;</mo><mrow><mo>(</mo><mn>2</mn><mo>)</mo></mrow></mrow><mo>&middot;</mo><mn>3</mn></mrow><mo>)</mo></mrow></mrow></mrow>', '("sin(1)+cos(exp(2)*3)").toMathML()');


	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cs>MathLib.js - A mathematical JavaScript library</cs></math>').toMathML(), '<ms>MathLib.js - A mathematical JavaScript library</ms>', '.toMathML() cs');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn type="complex-cartesian">2<sep/>3</cn></math>').toMathML(), '<mrow><mn>2</mn><mo>+</mo><mn>3</mn><mi>i</mi></mrow>', '.toMathML() complex');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn type="rational">3<sep/>4</cn></math>').toMathML(), '<mfrac><mn>3</mn><mn>4</mn></mfrac>', '.toMathML() rational');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><matrix><matrixrow><cn>1</cn><cn>2</cn></matrixrow><matrixrow><cn>3</cn><cn>4</cn></matrixrow><matrixrow><cn>5</cn><cn>6</cn></matrixrow></matrix></math>').toMathML(), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>5</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable><mo>)</mo></mrow>', '.toMathML() matrix');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><set><cn>1</cn><cn>2</cn><cn>3</cn></set></math>').toMathML(), '<mrow><mo>{</mo><mn>1</mn><mo>,</mo><mn>2</mn><mo>,</mo><mn>3</mn><mo>}</mo></mrow>', '.toMathML() set');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><vector><cn>1</cn><cn>2</cn><cn>3</cn></vector></math>').toMathML(), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable><mo>)</mo></mrow>', 'toMathML() vector');
});




